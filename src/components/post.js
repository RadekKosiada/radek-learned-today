import React from 'react';
import ReactMarkdown from 'react-markdown';
import Skeleton from 'react-loading-skeleton';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-okaidia.css';

import './post.css';

import SSRComponent from './SSRComponent.js';
import { Card, CardBorder } from './card.js';
import Date from './date.js';
import Container from './container.js';
import getClient from '../lib/get-contentful-client.js';

class Post extends SSRComponent {
  constructor(props) {
    super(props);
    const { match } = props;

    this.state = props.initialState || {
      error: null,
      isLoaded: false,
      post: { fields: {} },
      slug: match.params.slug
    };
  }

  componentDidMount() {
    this.state.isLoaded ||
      getClient(process.env)
        .getEntries({
          content_type: 'post',
          'fields.slug': this.state.slug
        })
        .then(({ items }) => {
          if (items[0]) {
            this.setState({
              post: items[0],
              isLoaded: true
            });
          } else {
            this.setState({
              error: new Error('Not found')
            });
          }
        })
        .catch(error => {
          this.setState({
            error,
            isLoaded: true
          });
        });
    Prism.highlightAll();
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  render() {
    const { error, post } = this.state;

    if (error) {
      return (
        <Redirect
          to={{
            pathname: '/404',
            state: { from: this.props.location }
          }}
        />
      );
    } else {
      const { fields } = post;

      return (
        <div className="c-post">
          <Helmet>
            <title>{`${fields.title} | Today I Learned`}</title>
          </Helmet>
          <Link className="o-paddedLink" to="/">
            Home
          </Link>
          <Container>
            <Card>
              {fields.category ? (
                <CardBorder
                  className={`o-gradient-${fields.category.fields.slug}`}
                />
              ) : (
                ''
              )}
              {fields.publishDate ? (
                <Date dateString={fields.publishDate} />
              ) : (
                <Skeleton />
              )}
              <h1>{fields.title || <Skeleton />}</h1>
              {fields.body ? (
                <ReactMarkdown source={fields.body} />
              ) : (
                <Skeleton count="5" />
              )}
            </Card>
          </Container>
        </div>
      );
    }
  }
}

export default Post;
