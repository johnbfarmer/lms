import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { MdClear } from "react-icons/md";

export default function ImageGalleryComponent(props) {
    const {data, setData, post} = useForm({
        courseId: props.course.id,
        file: null,
        imageName: '',
    })

    const submit = (e) => {
        post(route('image.upload'), {data: data, onSuccess: (d) => { console.log(d) }})
        e.preventDefault();
    }

    const setFile = (e) => {
        let c = { ...data }
        c.file = e.target.files[0]
        c.imageName = e.target.files[0].name
        setData(c)
    }

    const setImageName = (e) => {
        let c = { ...data }
        c.imageName = e.target.value
        setData(c)
    }

    const images = props.images.map((im, k) => {
        return (
            <div key={k} className="max-w-[300px] m-2 overflow-x-hide" onClick={() => props.addImageToProb(im)}>
                <div className="m-2">
                    <img src={im} width={50} height={50} />
                </div>
                <div className="m-2">
                    {im.replace('/storage/'+props.course.id+'/thumbs/', '')}
                </div>
            </div>
        )
    })

    return (
        <div className="mx-auto my-6 w-7xl space-y-6 sm:px-6 lg:px-8 h-screen">
            <Modal show={props.show} onClose={props.onClose} >
                <div className={`bg-white p-4 shadow sm:rounded-lg`}>
                    <MdClear className="float-right cursor-pointer" onClick={ props.onClose }/>
                    <div className="h-fit">
                        <div className="text-lg text-center">
                            Galería Curso {props.course.name}
                        </div>
                        <div className="py-2">
                            <input
                                type="file"
                                onChange={ setFile }
                                className="w-full"
                                placeholder="upload image..."
                            />
                        </div>
                        <div className="py-2 w-1/2">
                            <input
                                type="text"
                                value={data.imageName}
                                onChange={ setImageName }
                                className="w-full"
                                placeholder="image name"
                            />
                        </div>
                        <div className="mx-auto w-24 text-center my-4 sm:px-4 space-y-6 lg:px-8 cursor-pointer border border-black bg-white px-6 shadow sm:rounded-lg" onClick={ submit }>
                            <div className="">
                                Subir
                            </div>
                        </div>
                        <div className="flex flex-wrap overflow-y-scroll">
                            {images}
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    );
}
