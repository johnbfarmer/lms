import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function EndOfSet(props) {
    return (
        <div className="mx-auto my-6 max-w-7xl space-y-6 sm:px-6 lg:px-8">
            <Modal show={props.show} onClose={props.onClose} >
                <div className={`p-12 shadow sm:rounded-lg`}>
                    <div className="">
                        No hay más problemas
                    </div>
                </div>
            </Modal>

        </div>
    );
}
