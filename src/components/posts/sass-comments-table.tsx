import React from 'react';

const SassCommentsTable = () => {
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                <tr>
                    <th className="align-right"></th>
                    <th className="align-center">nested</th>
                    <th className="align-center">expanded</th>
                    <th className="align-center">compact</th>
                    <th className="align-center">compressed</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th className="align-right">인라인 주석 <code className="language-css">//</code></th>
                    <td className="align-center"><span className="monospace">X</span></td>
                    <td className="align-center"><span className="monospace">X</span></td>
                    <td className="align-center"><span className="monospace">X</span></td>
                    <td className="align-center"><span className="monospace">X</span></td>
                </tr>
                <tr>
                    <th className="align-right">블록 주석 <code className="language-css">/* */</code></th>
                    <td className="align-center"><span className="monospace">O</span></td>
                    <td className="align-center"><span className="monospace">O</span></td>
                    <td className="align-center"><span className="monospace">O</span><p className="p-smaller">한 줄로
                        출력</p></td>
                    <td className="align-center"><span className="monospace">△</span><p className="p-smaller"><code
                        className="language-css">!</code>로 시작할 경우에만 출력</p></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SassCommentsTable;
