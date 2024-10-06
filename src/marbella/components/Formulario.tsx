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
  const validateForm = (values: T) => {
    const errors: Partial<T> = {};
    fields.map((field) => {
      if (!values[field.name]) {
        errors[field.name] = "Este campo no puede estar campo vacio";
      }
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
      <div className={`w-full max-w-${selects ? '4xl' : 'xl'} bg-white shadow-lg rounded-lg p-8 relative`}>
        < div className="flex items-center">
          <h3 className="text-blue-600 text-xl font-bold flex-1">
            {isEditMode ? "Editar" : "Agregar nuevo"} {nameForm}
          </h3>
        </div>

        <form className="space-y-4 mt-8" onSubmit={formik.handleSubmit}>
          <div className={selects ? `grid sm:grid-cols-2 gap-4` : "space-y-4 mt-8"}>
            {fields.map((field, index) => {
              return (
                <div key={index} className={selects ? 'block w-full relative items-center' : ''}>
                  <label
                    className={`text-${formik.touched[field.name] && formik.errors[field.name]
                      ? "red"
                      : "gray"
                      }-500 text-sm mb-2 block`}
                  >
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    value={formik.values[field.name] as string}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type={field.type}
                    placeholder={field.placeholder}
                    className={`px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-2 border-${formik.touched[field.name] && formik.errors[field.name]
                      ? "red"
                      : "gray"
                      }-500 focus:outline-blue-600 focus:bg-transparent rounded-lg`}
                  />
                </div>
              );
            })}
            {/* {formik.touched.nombreMarca && formik.errors.nombreMarca ? <p> {formik.errors.nombreMarca} </p> : undefined} */}
            {selects && (
              selects.map((select, index) => {
                return (
                  < div key={index} className="block w-full">
                    <label
                      className={`text-${formik.touched[select?.name] && formik.errors[select?.name]
                        ? "red"
                        : "gray"
                        }-500 text-sm mb-2 block`}
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
            <Button type={"submit"}>
              {isEditMode ? "Editar" : "Agregar"} {nameForm}
            </Button>
          </div>
        </form>
      </div >
    </div >
  );
};
