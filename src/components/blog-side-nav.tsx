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
        <nav className="post-side-nav">
            {allSubjectJson.nodes.map(node => (
                <div key={node.id}>
                    <h6 className={"post-side-nav-title" + (subject.id == node.id ? " active" : "")}>
                        {node.title!} ({node.posts.length})
                    </h6>

                    <ul className={`post-side-nav-list ${!node.posts.length ? 'empty' : ''}`}>
                        {node.posts.length ? node.posts.map(post => (
                            <li key={post.id}>
                                <Link to={`/blog/` + post.frontmatter.slug}
                                      className="post-side-nav-link"
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
