import { FaHome, FaGraduationCap, FaPlus, FaPencilAlt, FaBook, FaBookOpen, FaRegCopy } from 'react-icons/fa';
import { FaUserGroup } from "react-icons/fa6";

import { BiMath } from 'react-icons/bi';
import ProblemNav from '@/Components/ProblemNav';
import LessonNav from '@/Components/LessonNav';
import ChapterNav from '@/Components/ChapterNav';

export default function TopMenu(props) {
    let editMode = props.auth.edit_mode
    console.log(props.auth)

    let courseListLink = (
        <div className="mx-1" title="lista de cursos">
            <a href="/courses/all">
                <FaHome />
            </a>
        </div>
    )

    let courseLink = (
        <div className="mx-1" title="regresa al curso">
            <a href={`/course/${ props.courseId }`}>
                <FaBook />
            </a>
        </div>
    )

    let chapterLink = (
        <div className="mx-1" title="regresa al capítulo">
            <a href={`/chapter/${ props.chapterId }`}>
                <FaBookOpen />
            </a>
        </div>
    )
    let lessonLink = (
        <div className="mx-1" title="regresa a la lección">
            <a href={`/lesson/${ props.lessonId }`}>
                <FaGraduationCap />
            </a>
        </div>
    )
    let problemsLink = (
        <div className="mx-1" title="haz los problemas">
            <a href={`/problem-set/${ props.lessonId }`}>
                <BiMath />
            </a>
        </div>
    )
    let duplicateProblemLink = (
        <div className="mx-1" title="duplica problema">
            <a href={`/problem/${ props.problemId }/duplicate`}>
                <FaRegCopy />
            </a>
        </div>
    )
    let addProblemLink = (
        <div className="mx-1" title="agrega un problema">
            <a href={`/lesson/${ props.lessonId }/add-problem`}>
                <FaPlus />
            </a>
        </div>
    )
    let editProblemLink = (
        <div className="mx-1" title="edita este problema">
            <a href={`/problem/${ props.problemId }/edit`}>
                <FaPencilAlt />
            </a>
        </div>
    )
    let addCourseLink = (
        <div className="mx-1" title="agrega un curso">
            <a href={`/course/0/edit`}>
                <FaPlus />
            </a>
        </div>
    )
    let editChapterLink = (
        <div className="mx-1" title="edita este capítulo">
            <a href={`/chapter/${ props.chapterId }/edit`}>
                <FaPencilAlt />
            </a>
        </div>
    )
    let editCourseLink = (
        <div className="mx-1" title="edita este curso">
            <a href={`/course/${ props.courseId }/edit`}>
                <FaPencilAlt />
            </a>
        </div>
    )
    let editLessonLink = (
        <div className="mx-1" title="edita esta lección">
            <a href={`/lesson/${ props.lessonId }/edit`}>
                <FaPencilAlt />
            </a>
        </div>
    )
    let editProblemSetLink = (
        <div className="mx-1" title="edita los problemas de esta lección">
            <a href={`/problem-set/${ props.lessonId }/edit`}>
                <FaPencilAlt />
            </a>
        </div>
    )
    let problemNav = (
        <div className="mx-auto space-y-6 sm:px-6 lg:px-8">
            <div className="p-4 text-base sm:rounded-lg sm:p-1">
                <ProblemNav neighbors={ props.neighboringProblems } />
            </div>
        </div>
    )
    let lessonNav = (
        <div className="mx-auto space-y-6 sm:px-6 lg:px-8">
            <div className="p-4 text-base sm:rounded-lg sm:p-1">
                <LessonNav neighbors={ props.neighboringLessons } />
            </div>
        </div>
    )
    let chapterNav = (
        <div className="mx-auto space-y-6 sm:px-6 lg:px-8">
            <div className="p-4 text-base sm:rounded-lg sm:p-1">
                <ChapterNav neighbors={ props.neighboringChapters } />
            </div>
        </div>
    )
    let groupMg = (
        <div className="mx-1" title="Grupos">
            <a href={`/course/${ props.courseId }/groups`}>
                <FaUserGroup />
            </a>
        </div>
    )
    let groupAdd = (
        <div className="mx-1" title="Agregar Grupos">
            <a href={`/course/${ props.courseId }/group/add`}>
                <FaPlus />
            </a>
        </div>
    )

    return (
        <div className="flex justify-start w-full">
            <h2>{ props.title }</h2>
            { props.show.indexOf('home') >= 0 && courseListLink }
            { props.show.indexOf('course') >= 0 && props.courseId && courseLink }
            { props.show.indexOf('chapter') >= 0 && props.chapterId && chapterLink }
            { props.show.indexOf('lesson') >= 0 && props.lessonId && lessonLink }
            { props.show.indexOf('prob-set') >= 0 && props.lessonId && problemsLink }
            { props.show.indexOf('prob-set-edit') >= 0 && props.lessonId && editProblemSetLink }
            { props.show.indexOf('prob-add') >= 0 && props.lessonId && editMode && addProblemLink }
            { props.show.indexOf('prob-dup') >= 0 && props.problemId && editMode && duplicateProblemLink }
            { props.show.indexOf('prob-edit') >= 0 && props.problemId && editMode && editProblemLink }
            { props.show.indexOf('prob-nav') >= 0 && props.neighboringProblems  && problemNav }
            { props.show.indexOf('course-add') >= 0 && editMode && addCourseLink }
            { props.show.indexOf('course-edit') >= 0 && props.courseId && editMode && editCourseLink }
            { props.show.indexOf('chapter-edit') >= 0 && props.chapterId && editMode && editChapterLink }
            { props.show.indexOf('lesson-edit') >= 0 && props.lessonid && editMode && editLessonLink }
            { props.show.indexOf('lesson-nav') >= 0 && props.neighboringLessons  && lessonNav }
            { props.show.indexOf('chapter-nav') >= 0 && props.neighboringChapters  && chapterNav }
            { props.show.indexOf('group-mg') >= 0 && props.courseId && editMode && groupMg }
            { props.show.indexOf('add-group') >= 0 && props.courseId && editMode && groupAdd }
        </div>
    );
}
 