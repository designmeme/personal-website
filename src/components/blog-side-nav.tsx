import React from 'react';
import {graphql, Link, useStaticQuery} from "gatsby";
import {gaEvent} from "../hooks/analytics";


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
        <nav className="sub-nav">
            {allSubjectJson.nodes.map(node => (
                <div key={node.id}>
                    <h6 className={"sub-nav-title" + (subject.id == node.id ? " active" : "")}>
                        {node.title!} ({node.posts.length})
                    </h6>

                    <ul className={`sub-link-list ${!node.posts.length ? 'empty' : ''}`}>
                        {node.posts.length ? node.posts.map(post => (
                            <li key={post.id}>
                                <Link to={`/blog/` + post.frontmatter.slug}
                                      className="sub-link"
                                      activeClassName="active"
                                      onClick={() => gaEvent('navigation', 'click_post_in_sidebar', post.frontmatter.title)}
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
