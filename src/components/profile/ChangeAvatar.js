import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { updateUser } from "../../redux/slices/authSlice";
import { changeAvatar } from "../../redux/slices/userSlice";
import "./profileComponent.css";

const ChangeAvatar = ({
  avatarModal,
  setAvatarModal,
  user,
  pickedAvatar,
  setPickedAvatar,
}) => {
  const dispatch = useDispatch();
  const handleChangeAvatar = () => {
    dispatch(
      changeAvatar({
        userId: user?._id,
        avatarId: pickedAvatar,
      })
    );
    setAvatarModal(false);
    dispatch(updateUser({ action: "crrAvatar", data: pickedAvatar }));
  };

  return (
    <Modal
      isOpen={avatarModal}
      toggle={() => setAvatarModal(!avatarModal)}
      style={{ zIndex: "9999" }}
      centered
    >
      <ModalHeader
        toggle={() => setAvatarModal(!avatarModal)}
        className="pb-0 border-0"
      ></ModalHeader>
      <div className="d-flex flex-column align-items-center">
        <span className="fs-5 fw-600">Change Avatar</span>
        <span className="text-secondary fs-7">
          Pick your favorite one and confirm.
        </span>
      </div>
      <ModalBody className="text-center gap-1">
        <Row className="m-0 p-0">
          {[1, 1, 1, 1, 1, 1, 1, 1, 1]?.map((item, index) => (
            <Col key={index} md="4" className="p-0 m-0 mb-1">
              <img
                src={
                  process.env.REACT_APP_PUBLIC_FOLDER +
                  `/avatars/cat${index}.svg`
                }
                alt="user avatar option"
                width={100}
                height={100}
                className={`avatar-option pointer ${
                  index === pickedAvatar ? "picked-avatar" : null
                }`}
                onClick={() => setPickedAvatar(index)}
              />
            </Col>
          ))}
        </Row>
      </ModalBody>
      <ModalFooter className="text-center justify-content-center">
        <button
          className="fs-7 px-2 py-2 rounded-3 bg-color-white"
          onClick={() => setAvatarModal(false)}
        >
          Cancel
        </button>
        <button
          className="fs-7 px-3 py-2 rounded-3 bg-color-green text-white"
          onClick={handleChangeAvatar}
        >
          Confirm Change
        </button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default ChangeAvatar;
