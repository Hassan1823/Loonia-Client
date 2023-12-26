import React, { FC } from "react";
import { Modal, Box } from "@mui/material";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  setRoute?: (route: string) => void;
};

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  activeItem,
  component: Component,
  setRoute,
}) => {
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-[450px] bg-slate-950 rounded-[8px] shadow p-4 border">
          <Component setOpen={setOpen} setRoute={setRoute} />
        </Box>
      </Modal>
    </>
  );
};

export default CustomModal;
