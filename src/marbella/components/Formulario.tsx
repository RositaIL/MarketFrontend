/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { Button } from "./Button";

type Options = {
  value: string | number;
  label: string;
};

type Selects = {
  name: string;
  options: Options[];
};

type Fields = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
};

type FormProps<T> = {
  initialValue: T;
  fields: Fields[];
  selects?: Selects[];
  isEditMode: boolean;
  nameForm: string;
  onSubmitForm: (values: T) => void;
  onCancelForm: () => void;
};

export const Formulario = <T extends Record<string, unknown>>({
  fields,
  nameForm,
  selects,
  isEditMode,
  initialValue,
  onSubmitForm,
  onCancelForm,
}: FormProps<T>) => {
  //Boton camcelar
  const handleCancel = () => onCancelForm();

  //Validar formulario
  const validateForm = (values: any) => {
    const errors: { [key: string]: string } = {};
    fields.map((field) => {
      const value = values[field.name]
      if (typeof value === 'string' && !value.trim()) {
        errors[field.name] = "Este campo no puede estar campo vacio";
      };
      if (typeof value === "number" && value < 1) {
        errors[field.name] = "El valor no puede tener menor o igual a 0";
      };
    });
    return errors;
  };


  //Formik para Validar formulario
  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: (values, { resetForm }) => {
      onSubmitForm(values);
      resetForm();
    },
    validate: validateForm,
  });

  return (
    <div
      className={`fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]`}
    >
      <div className={`w-full bg-white shadow-lg rounded-lg p-8 relative`} style={{ maxWidth: (selects ? 800 : 576) }}>
        < div className="flex items-center">
          <h3 className="text-blue-600 text-xl font-bold flex-1">
            {isEditMode ? "Editar" : "Agregar nuevo"} {nameForm}
          </h3>
        </div>

        <form className="space-y-4 mt-8" onSubmit={formik.handleSubmit}>
          <div className={selects ? `grid sm:grid-cols-2 gap-4` : "space-y-4 mt-8"}>
            {fields.map((field, index) => {
              return (
                <div key={index}>
                  <div className="relative flex items-center">
                    <label
                      className={`text-${formik.touched[field.name] && formik.errors[field.name] ? 'red-500' : '[#007bff]'} absolute top-[-10px] left-0 font-bold`}>
                      {field.label}
                    </label>
                    <input
                      value={formik.values[field.name] as string}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="px-2 no-spinners appearance-none pt-5 pb-2 bg-white w-full text-sm border-b-2 border-[#007bff] focus:border-[#007bff] outline-none" />

                  </div>
                  <p className="text-xs h-0.5 text-red-500 flex items-center mt-2">
                    {formik.touched[field.name] && formik.errors[field.name] ? formik.errors[field.name] as string : undefined}
                  </p>
                </div>
              );
            })}

            {selects && (
              selects.map((select, index) => {
                return (
                  < div key={index} className="block w-full">
                    <label
                      className={`text-${formik.touched[select?.name] && formik.errors[select?.name]
                        ? "red-500"
                        : "[#007bff]"
                        } text-sm block font-bold`}
                    >
                      {select?.name}
                    </label>
                    <select
                      value={formik.values[select?.name] as string}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id={select?.name}
                      name={select?.name}
                      className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
                    >
                      {select?.options.map((option, index) => {
                        return (
                          <option key={index} value={option.value}> {option.label}</option>
                        );
                      })}
                    </select>
                  </div>)
              })
            )}
          </div>
          <div className="flex justify-end gap-4 !mt-8">
            <Button
              onClick={handleCancel}
              colorBG={"gray-200"}
              colorText={"gray-800"}
              hoverColor={"bg-gray-300"}
              activeColor=""
            >
              Cancelar
            </Button>
            <Button
              onClick={() => { }}
              type={"submit"}
            >
              {isEditMode ? "Editar" : "Agregar"} {nameForm}
            </Button>
          </div>
        </form>
      </div >
    </div >
  );
};
