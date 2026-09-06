import React from 'react';
import {graphql, Link, useStaticQuery} from "gatsby";


export const query = graphql`
    fragment BlogSideNavSubject on MdxFrontmatter {
        subject {
            slug
            id
            title
        }
    }
`

const BlogSideNav: React.FC<Queries.BlogSideNavSubjectFragment> = ({subject}) => {

    const {allSubjectJson} = useStaticQuery<Queries.SubjectNavQuery>(graphql`
        query SubjectNav {
            allSubjectJson {
                nodes {
                    id
                    slug
                    title
                    posts {
                        id
                        frontmatter {
                            title
                            slug
                        }
                    }
                }
            }
        }
    `)

    return (
        <nav className="text-xs sticky top-[130px] h-[calc(100vh-180px)] overflow-y-auto">
            {allSubjectJson.nodes.map(node => (
                <div key={node.id} className="mb-6">
                    <h6 className={"mb-4 font-normal text-xs" + (subject.id == node.id ? " text-inherit" : " text-secondary")}>
                        {node.title!} ({node.posts.length})
                    </h6>

                    <ul className="pl-3">
                        {node.posts.length ? node.posts.map(post => (
                            <li key={post.id} className="mb-3">
                                <Link to={`/blog/` + post.frontmatter.slug}
                                      className="block text-muted hover:text-inherit"
                                      activeClassName="text-brand!"
                                >{post.frontmatter.title}</Link>
                            </li>
                        )) : <li>작성 중 ✍️</li>}
                    </ul>
                </div>
            ))}
        </nav>
    );
};

export default BlogSideNav;
