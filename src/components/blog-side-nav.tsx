import React from 'react';
import {graphql, Link, useStaticQuery} from "gatsby";
import {gaEvent} from "../hooks/analytics";


interface BlogSideNavProps {
    subject: string
}

const BlogSideNav: React.FC<BlogSideNavProps> = ({subject}) => {
    const {allPostMdx: {group: data}} = useStaticQuery(graphql`
        query {
            allMdx(sort: {frontmatter: {order: ASC}}) {
                group(field: {frontmatter: {subject: {slug: SELECT}}}) {
                    totalCount
                    fieldValue
                    edges {
                        next {
                            frontmatter {
                                slug
                            }
                            id
                        }
                        node {
                            id
                            frontmatter {
                                subject {
                                    slug
                                    title
                                }
                                title
                                subtitle
                                slug
                                created_at
                                updated_at
                                order
                            }
                        }
                        previous {
                            frontmatter {
                                slug
                            }
                            id
                        }
                    }
                }
            }
        }
    `)

    return (
        <nav className="sub-nav">
            {data.map((group, index) => (
                <div key={`sub-nav-${index}`}>
                    <h6 className={"sub-nav-title" + (subject == group.fieldValue && " active")}>
                        {group.fieldValue!} ({group.totalCount})
                    </h6>

                    <ul className="sub-link-list">
                        {group.edges.map(edge => (
                            <li key={edge.node.id}>
                                <Link to={`/blog/` + edge.node.frontmatter?.slug}
                                      className="sub-link"
                                      activeClassName="active"
                                      onClick={() => gaEvent('post-nav-link', 'click', edge.node.frontmatter?.title!)}
                                >{edge.node.frontmatter?.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </nav>
    );
};

export default BlogSideNav;
