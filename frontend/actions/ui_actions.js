export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = modalName => {
  return({
    type: OPEN_MODAL,
    modalName
  })
};

export const closeModal = () => {
  return({
    type: CLOSE_MODAL
  })
}