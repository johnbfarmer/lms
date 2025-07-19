import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CourseComponent from '@/Components/CourseComponent';
import TopMenu from '@/Components/TopMenu';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Link, Head } from '@inertiajs/react';

const Groups = ({ auth, course, group }) => {
    const { data, setData, post } = useForm({
        name: group ? group.name : '',
        id: group ? group.id : null,
        course_id: group ? group.course_id : course.id,
    })

    const submit = (e) => {
        post(route('group.save'), {
            // onFinish: () => console.log('ok'),
        });
        e.preventDefault();
    }

    const updateName = (e) => {
        let d = { ...data }
        d.name = e.target.value
        setData(d)
    }

    const title = 'Grupo'

    let topMenu = (
        <TopMenu auth={auth} title={ title } show={['home']} />
    )

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
            <div className="text-center w-full">
                <div className="text-center max-w-7xl  mx-auto shadow">
                    <div>
                        <InputLabel value="Nombre del Grupo:"/>
                        <input type = 'text' value={ data.name } onChange={ updateName } />
                    </div>
                    <div>
                        <PrimaryButton onClick={ submit }>
                            GUARDAR
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Groups;
