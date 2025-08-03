import Modal from '@/Components/Modal';

export default function ImageGalleryComponent(props) {
    return (
        <div className="mx-auto my-6 max-w-7xl space-y-6 sm:px-6 lg:px-8 h-screen">
            <Modal show={props.show} onClose={props.onClose} >
                <div className={`bg-white p-4 shadow sm:rounded-lg`}>
                    <div className="flex flex-col justify-between">
                        <div className="flex justify-col">
                            Galería Curso {props.courseId}
                        </div>
                        <div className="flex justify-col">
                            images here
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    );
}
