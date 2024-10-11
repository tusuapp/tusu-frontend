import { useRef, useState } from "react";
import { Dialog } from "@headlessui/react";

function TutorModal({ isOpen, onClose }: any) {
  // The open/closed state lives outside of the Dialog and is managed by you
  //   let [isOpen, setIsOpen] = useState(true);

  let completeButtonRef = useRef(null);

  function handleDeactivate() {
    // ...
  }

  return (
    /*
      Pass `isOpen` to the `open` prop, and use `onClose` to set
      the state back to `false` when the user clicks outside of
      the dialog or presses the escape key.
    */
    <Dialog
      initialFocus={completeButtonRef}
      open={isOpen}
      onClose={() => onClose()}
      style={{
        backgroundColor: "red",
        position: "absolute",
        top: "50%",
        zIndex: 100,
      }}
    >
      <Dialog.Overlay
        style={{ backgroundColor: "red", position: "absolute" }}
        className="fixed inset-0 bg-black opacity-30"
      />

      <Dialog.Title>Deactivate account</Dialog.Title>
      <Dialog.Description>
        This will permanently deactivate your account
      </Dialog.Description>

      <p>
        Are you sure you want to deactivate your account? All of your data will
        be permanently removed. This action cannot be undone.
      </p>

      <button onClick={() => onClose()}>Cancel</button>
      <button onClick={handleDeactivate}>Deactivate</button>
    </Dialog>
  );
}

export default TutorModal;
