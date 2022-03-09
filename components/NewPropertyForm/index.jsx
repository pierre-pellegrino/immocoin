import Errors from "components/Errors";
import ValidationIcon from "components/ValidationIcon";
import APIManager from "pages/api/axiosMethods";
import { useRef } from "react";
import {
  form,
  input,
  inputWrapper,
  btn,
  textarea,
} from "styles/form.module.scss";

const NewPropertyForm = () => {
  const title = useRef();
  const description = useRef();
  const price = useRef();
  const address = useRef();
  const picture = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formObj = {
      title: title.current.value,
      description: description.current.value,
      price: parseInt(price.current.value, 10),
      address: address.current.value,
      picture: picture.current.files[0],
    }

    const data = new FormData();

    Object.keys(formObj).forEach((key) => {
      data.append(key, formObj[key])
    });

    try {
      console.log(data);
      const response = await APIManager.newProperty(data);
      console.log(response.data)
    } catch (e) {
      console.error(e.response);
    }
  };

  return (
    <form className={form} onSubmit={handleSubmit}>
      <h1>Créer un logement</h1>

      {/* {serverErrors !== "" && <Errors serverErrors={serverErrors} />} */}

      <div className={inputWrapper}>
        <input
          type="text"
          className={input}
          id="title-input"
          placeholder="Title"
          ref={title}
        />
        <label htmlFor="title-input">Nom du logement</label>
        {/* <ValidationIcon isValid={serverErrors === "" && validEmail} /> */}
      </div>

      <div className={inputWrapper}>
        <textarea
          className={`${input} ${textarea}`}
          id="description-input"
          placeholder="Description"
          ref={description}
        />
        <label htmlFor="description-input">Description</label>
        {/* <ValidationIcon isValid={serverErrors === "" && validEmail} /> */}
      </div>

      <div className={inputWrapper}>
        <input
          type="number"
          className={input}
          id="price-input"
          placeholder="Prix"
          ref={price}
        />
        <label htmlFor="price-input">Prix</label>
        {/* <ValidationIcon isValid={serverErrors === "" && validEmail} /> */}
      </div>

      <div className={inputWrapper}>
        <input
          type="text"
          className={input}
          id="address-input"
          placeholder="Adresse"
          ref={address}
        />
        <label htmlFor="address-input">Adresse</label>
        {/* <ValidationIcon isValid={serverErrors === "" && validEmail} /> */}
      </div>

      <div className={inputWrapper}>
        <input
          type="file"
          className={input}
          id="picture-input"
          placeholder="Photo"
          ref={picture}
        />
        <label htmlFor="picture-input">Photo</label>
        {/* <ValidationIcon isValid={serverErrors === "" && validEmail} /> */}
      </div>

      <input
        className={btn}
        type="submit"
        role="button"
        value="Confirmer"
        // disabled={!canSave}
      />
    </form>
  );
};

export default NewPropertyForm;
