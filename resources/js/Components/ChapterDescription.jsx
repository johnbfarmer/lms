import StudentProgress from '@/Components/StudentProgress';

export default function ChapterDescription(props) {
    return (
        <div className="py-2" >
            <div className="mx-auto max-w-7xl space-y-1 sm:px-6 lg:px-8">
                <div className="bg-white px-4 shadow sm:rounded-lg sm:px-8 sm:py-2">
                    <div className="flex">
                        <div className="mx-1 text-xl">
                            <a href={`/chapter/${ props.lesson.id }`}>
                                { props.lesson.name }
                            </a>
                        </div>
                        <StudentProgress progress={ props.progress } courseId={ props.lesson.id }/>
                    </div>
                </div>
            </div>
        </div>
    );
}
