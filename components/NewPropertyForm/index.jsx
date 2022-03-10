import Errors from "components/Errors";
import ValidationIcon from "components/ValidationIcon";
import { useRouter } from "next/router";
import APIManager from "pages/api/axiosMethods";
import { useRef, useState } from "react";
import {
  form,
  input,
  inputWrapper,
  btn,
  textarea,
} from "styles/form.module.scss";
import withPrivateRoute from "components/withPrivateRoute";

const NewPropertyForm = () => {
  const title = useRef();
  const description = useRef();
  const price = useRef();
  const address = useRef();
  const picture = useRef();
  const [validTitle, setValidTitle] = useState(false);
  const [validDescription, setValidDescription] = useState(false);
  const [validPrice, setValidPrice] = useState(false);
  const [validAddress, setValidAddress] = useState(false);
  const [validPicture, setValidPicture] = useState(false);
  const [serverErrors, setServerErrors] = useState("");
  const router = useRouter();

  const titleValidation = () => {
    setServerErrors("");
    const titleLength = title.current.value.length;
    return titleLength >= 5 && titleLength <= 144;
  }

  const descriptionValidation = () => {
    setServerErrors("");
    const descriptionLength = description.current.value.length;
    return descriptionLength >= 5 && descriptionLength <= 1000;
  }

  const priceValidation = () => {
    setServerErrors("");
    return (
      parseInt(price.current.value, 10) >= 0 
      && /^\d+$/.test(price.current.value)
    );
  }

  const addressValidation = () => {
    setServerErrors("");
    const addrLength = address.current.value.length;
    return addrLength > 0;
  }

  const pictureValidation = () => {
    setServerErrors("");
    return picture.current?.files[0] !== undefined;
  }

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
      const response = await APIManager.newProperty(data);
      router.push(`/properties/${response.data.property.id}`);
    } catch (error) {
      const errorText = error.response.data.error;
      setServerErrors(errorText ?? "Oups ! Quelque chose s'est mal passé 😅");
    }
  };

  const canSave = [
    validTitle,
    validDescription,
    validPrice,
    validAddress,
    validPicture,
  ].every(Boolean);

  return (
    <form className={form} onSubmit={handleSubmit}>
      <h1>Créer un logement</h1>

      {serverErrors !== "" && <Errors serverErrors={serverErrors} />}

      <div className={inputWrapper}>
        <input
          type="text"
          className={input}
          id="title-input"
          placeholder="Title"
          ref={title}
          onChange={() => setValidTitle(titleValidation())}
        />
        <label htmlFor="title-input">Nom du logement</label>
        <ValidationIcon isValid={serverErrors === "" && validTitle} />
      </div>

      <div className={inputWrapper}>
        <textarea
          className={`${input} ${textarea}`}
          id="description-input"
          placeholder="Description"
          ref={description}
          onChange={() => setValidDescription(descriptionValidation())}
        />
        <label htmlFor="description-input">Description</label>
        <ValidationIcon isValid={serverErrors === "" && validDescription} />
      </div>

      <div className={inputWrapper}>
        <input
          type="number"
          className={input}
          id="price-input"
          placeholder="Prix"
          ref={price}
          onChange={() => setValidPrice(priceValidation())}
        />
        <label htmlFor="price-input">Prix</label>
        <ValidationIcon isValid={serverErrors === "" && validPrice} />
      </div>

      <div className={inputWrapper}>
        <input
          type="text"
          className={input}
          id="address-input"
          placeholder="Adresse"
          ref={address}
          onChange={() => setValidAddress(addressValidation())}
        />
        <label htmlFor="address-input">Adresse</label>
        <ValidationIcon isValid={serverErrors === "" && validAddress} />
      </div>

      <div className={inputWrapper}>
        <input
          type="file"
          className={input}
          id="picture-input"
          placeholder="Photo"
          ref={picture}
          onChange={() => setValidPicture(pictureValidation())}
        />
        <label htmlFor="picture-input">Photo</label>
        <ValidationIcon isValid={serverErrors === "" && validPicture} />
      </div>

      <input
        className={btn}
        type="submit"
        role="button"
        value="Confirmer"
        disabled={!canSave}
      />
    </form>
  );
};

export default withPrivateRoute(NewPropertyForm);
