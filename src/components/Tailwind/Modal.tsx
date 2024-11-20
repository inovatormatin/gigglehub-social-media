import { X } from "@phosphor-icons/react";
import React from "react";
import { TailButton, TailSpinner } from "..";

interface Fprops {
    title: string;
    body: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >;
    open: boolean;
    onClose: () => void;
    confirmLable?: string;
    loading?: boolean;
    buttonIcon?: React.ReactNode
    onClick: () => void
}

const Modal: React.FC<Fprops> = ({ open, title, body, onClose, buttonIcon, onClick, loading = false, confirmLable = 'Confirm' }) => {
    return (
        <>
            {open ? (
                <div
                    className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    id="modal"
                >
                    <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-lg">
                        {/* <!-- Modal Header --> */}
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-lg font-md text-gray-800">{title}</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={onClose}
                            >
                                <X size={20} weight="bold" />
                            </button>
                        </div>

                        {/* Body */}
                        <>{body}</>


                        {/* <!-- Modal Footer --> */}
                        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                            {!loading &&
                                <TailButton
                                    label="Cancel"
                                    color="red"
                                    size="xs"
                                    onClick={onClose}
                                    icon={<X weight="bold" />}
                                />
                            }
                            <TailButton
                                label={loading ? 'Uploading...' : confirmLable}
                                color="green"
                                size="xs"
                                classes="ml-2"
                                disabled={loading}
                                icon={loading ? <TailSpinner /> : buttonIcon}
                                onClick={onClick}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Modal;
