import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CourseComponent from '@/Components/CourseComponent';
import TopMenu from '@/Components/TopMenu';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import ObjContainer from '@/Components/ObjContainer';
import { useForm, Link, Head } from '@inertiajs/react';
import { MdClear } from "react-icons/md";
import { buildBreadCrumbs } from '@/Helpers/Utilities';

const Groups = ({ auth, course, group, allStudents }) => {  
    const [filter, setFilter] = useState('')
    const [students, setStudents] = useState(allStudents)
    const [inGroup, setInGroup] = useState([])
    const [notInGroup, setNotInGroup] = useState([])
    const [inGroupFiltered, setInGroupFiltered] = useState([])
    const [notInGroupFiltered, setNotInGroupFiltered] = useState([])
    const { data, setData, post } = useForm({
            name: group ? group.name : '',
            id: group ? group.id : null,
            course_id: group ? group.course_id : course.id,
            students: inGroup
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

    const addMember = () => {
        console.log(selected.id)
    }

    useEffect(() => {
        let inGp = []
        let notInGp = []
        allStudents.forEach(s =>{
            if (s.is_member > 0) {
                inGp.push(s)
            } else {
                notInGp.push(s)
            }
        })
        setInGroup(inGp)
        setNotInGroup(notInGp)
        setInGroupFiltered(inGp)
        setNotInGroupFiltered(notInGp)
    }, [])

    useEffect(() => {
        let a = filter.length ? [ ...inGroup ].filter(x => { return x.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0}) : [ ...inGroup ]
        let b = filter.length ? [ ...notInGroup ].filter(x => { return x.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0}) : [ ...notInGroup ]
        setInGroupFiltered(a)
        setNotInGroupFiltered(b)
        let d = { ...data }
        d.students = a
        setData(d)
    }, [filter, inGroup, notInGroup])

    const breadcrumbs = buildBreadCrumbs({course}, 2)

    let topMenu = (
        <TopMenu
            auth={auth}
            title={ title }
            courseId={ course.id }
            show={['home', 'add-group']}
            breadcrumbs={ breadcrumbs }
        />
    )

    const remove = (id) => {
        let a = [ ...notInGroup ];
        let b = [ ...inGroup ];
        let nw = b.filter(x => {return x.id === id})
        a.push(nw[0])
        setNotInGroup(a)
        let c = removeFromGroup(nw[0], b)
        setInGroup(c)
    }

    const add = (id) => {
        let a = [ ...inGroup ]
        let b = [ ...notInGroup ]
        let nw = b.filter(x => {return x.id === id})
        a.push(nw[0])
        setInGroup(a)
        let c = removeFromGroup(nw[0], b)
        setNotInGroup(c)
    }

    const removeFromGroup= (student, gp) => {
        let a = [ ...gp ]
        let idx = -1
        gp.some((d, k) => {
            if (d.id === student.id) {
                idx = k
                return true
            }
            return false
        })
        a.splice(idx, 1)
        return a
    }

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
            <div className="text-center w-full">
                <div className="text-center max-w-7xl bg-white rounded-md my-2 mx-auto shadow">
                    <div>
                        <InputLabel value="Nombre del Grupo:"/>
                        <input type = 'text' value={ data.name } onChange={ updateName } />
                    </div>
                    <div>
                        <PrimaryButton onClick={ submit } className="my-2">
                            GUARDAR
                        </PrimaryButton>
                    </div>
                </div>
                <div className="text-center max-w-7xl bg-white rounded-md my-2 mx-auto shadow">
                    <div>
                        Miembros
                    </div>
                    <div className="mx-auto w-full pt-5 flex flex-row justify-center">
                        <ObjContainer data={ inGroupFiltered } title="Miembros" xxx={ remove } />
                        <div className="flex flex-row">
                            <input
                                className="h-6"
                                value={filter}
                                onChange={(e) => {console.log(e.target.value);setFilter(e.target.value)}}
                                placeholder="Filtrar Nombres..."
                            />
                            <MdClear onClick={ () => setFilter('') }/>
                        </div>
                        <ObjContainer data={ notInGroupFiltered } title="No Miembros" xxx={ add } />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Groups;
