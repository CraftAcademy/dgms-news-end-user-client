import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Card } from 'semantic-ui-react'

const ArticleGroup = () => {
  const { category } = useParams()
  const { articles } = useSelector((state) => state)

  const articlesList = articles[category]?.map((article) => {
    return (
      <li key={article.id} style={{ listStyleType: 'none' }}>
        <Card>
          <Link to={`/article/${article.id}`}>
            <div>
              <h1 data-cy="article-title">{article.title}</h1>{' '}
            </div>
            <img
              src={article.image}
              alt=""
              style={{ height: 200 + 'px', width: 'auto' }}
            />
            <h3 data-cy="article-location">Country - {article.country}</h3>{' '}
          </Link>
        </Card>
      </li>
    )
  })

  return (
    <Container text>
      <div data-cy="category_header"> The latest {category} news </div>
      <ul data-cy="articles-list">{articlesList}</ul>
    </Container>
  )
}

export default ArticleGroup
