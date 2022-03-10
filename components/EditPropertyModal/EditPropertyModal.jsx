import React, { useRef } from 'react';
import Modal from 'react-modal';
import {modal, input} from 'components/ProfilePage/profile_page.module.scss';
import { btn } from 'styles/form.module.scss';
import APIManager from "pages/api/axiosMethods";
import { useRouter } from "next/router";

const EditPropertyModal = ({isOpen, toggle, id}) => {
  const title = useRef();
  const description = useRef();
  const price = useRef();
  const address = useRef();
  const picture = useRef();
  const router = useRouter();

  const handleEdit = async () => {
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
      const response = await APIManager.editProperty(id, data);
      console.log(response.data);
      router.push(`/properties/${response.data.property.id}`);
      toggle(false);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Modal
          className={modal}
          style={customStyles}
          isOpen={isOpen}
          onRequestClose={() => toggle(false)}
          ariaHideApp={false}
        >
          <label>Titre de l'annonce</label>
          <input 
            type="text"
            ref={title}
          />

          <label>Description</label>
          <textarea 
            className={input}
            type="text"
            ref={description}
          />

          <label>Prix</label>
          <input 
            type="number"
            min="0"
            ref={price}
          />

          <label>Adresse</label>
          <input 
            type="text"
            ref={address}
          />

          <label>Photo</label>
          <input 
            type="file"
            accept="image/png, image/jpeg"
            ref={picture}
          />
          <br />
          <button className={btn} onClick={() => handleEdit()}>Enregistrer</button>
      </Modal>
  );
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    zIndex: 1000
  }
};

export default EditPropertyModal;