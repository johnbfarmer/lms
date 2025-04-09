import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, Link, Head } from '@inertiajs/react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

const Test = ({ auth, problemSet, pageAssets }) => {

    const title = `Lesson Test`
console.log(problemSet)
console.log(pageAssets)
    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={title}>
            <Head title={title} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        Image test:
                        <div className="py-10 mx-auto">
                            <img src="/storage/dog.jpg"  alt="Dog Image" />
                        </div>
                        <div className="py-10 mx-auto">
                            Latex:
                        </div>
                        <div className="py-10 mx-auto">
                            <Latex>{1 + 2}) Solve for z: $f(x) = e^x + e^y$.</Latex>
                        </div>
                        <div className="mx-auto p-top 4"><Latex>$ \frac{1}{2}x = 1 $</Latex></div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Test;
