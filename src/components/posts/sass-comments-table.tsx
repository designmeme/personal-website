import React from 'react';

const SassCommentsTable = () => {
    return (
        <div className="table-container">
            <table className="table">
                <thead>
                <tr>
                    <th className="text-right"></th>
                    <th className="text-center">nested</th>
                    <th className="text-center">expanded</th>
                    <th className="text-center">compact</th>
                    <th className="text-center">compressed</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th className="text-right">인라인 주석 <code className="language-css">//</code></th>
                    <td className="text-center"><span className="font-mono">X</span></td>
                    <td className="text-center"><span className="font-mono">X</span></td>
                    <td className="text-center"><span className="font-mono">X</span></td>
                    <td className="text-center"><span className="font-mono">X</span></td>
                </tr>
                <tr>
                    <th className="text-right">블록 주석 <code className="language-css">/* */</code></th>
                    <td className="text-center"><span className="font-mono">O</span></td>
                    <td className="text-center"><span className="font-mono">O</span></td>
                    <td className="text-center"><span className="font-mono">O</span><p className="text-sm">한 줄로
                        출력</p></td>
                    <td className="text-center"><span className="font-mono">△</span><p className="text-sm"><code
                        className="language-css">!</code>로 시작할 경우에만 출력</p></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SassCommentsTable;
