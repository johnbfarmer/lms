import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CourseComponent from '@/Components/CourseComponent';
import TopMenu from '@/Components/TopMenu';
import { router, Link, Head } from '@inertiajs/react';
import { FaTrash, FaPlus, FaPencilAlt } from "react-icons/fa";

const Groups = ({ auth, course, groups }) => {

    const title = 'Grupos'

    let topMenu = (
        <TopMenu auth={auth} title={ title } courseId={ course.id } show={['home', 'add-group']} />
    )

    const edit = (id) => {
        alert("SOON");
    }

    const deleteGp = (id) => {
        alert("TBI")
    }

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
            {groups.map ((gp, k) => {
                return (
                    <div key={ k } className="flex flex-row justify-center mx-10">
                        <div className="m-1 px-20 py-1 w-1/4">
                            <Link href={`/group/${gp.id}`}>{ gp.name }</Link>
                        </div>
                        <div className="m-1 p-1 cursor-pointer" >
                            <Link href={`/group/${gp.id}`}><FaPencilAlt /></Link>
                        </div>
                        <div className="m-1 p-1 cursor-pointer" onClick={ (e) => {deleteGp(gp.id)} }>
                            <FaTrash />
                        </div>
                    </div>
                )
            })}
        </AuthenticatedLayout>
    )
}

export default Groups;
