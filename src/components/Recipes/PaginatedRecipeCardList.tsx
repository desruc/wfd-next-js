import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import qs from 'query-string';

import Box from '@material-ui/core/Box';

import Loader from '~/components/Global/Loader';
import RecipeCardList from '~/components/Recipes/RecipeCardList';
import NetworkRecipeCardList from '~/components/Recipes/NetworkRecipeCardList';
import Button from '~/components/Inputs/Button';

interface PaginatedRecipeCardListProps {
  url: string;
  limit?: number;
  noDataComponent?: React.ReactNode;
}

const PaginatedRecipeCardList: React.FC<PaginatedRecipeCardListProps> = ({
  url,
  limit,
  noDataComponent
}: PaginatedRecipeCardListProps) => {
  const router = useRouter();

  const [page, setPage] = useState(0);

  const parsed = qs.parseUrl(url);

  const hasAdditionalQuery = Object.keys(parsed.query).length;

  const computedUrl = `${url}${
    hasAdditionalQuery ? '&' : '?'
  }page=${page}&limit=${limit}`;

  const { data } = useSWR(computedUrl);

  const onLoadMore = () => setPage(page + 1);

  const onRecipeClick = ({ id: recipeId }) =>
    router.push(`/recipes/${recipeId}`);

  const hasInitialData = data?.data?.length > 0;

  const canLoadMore = data?.meta?.total > page * limit + data?.data?.length;

  return (
    <section>
      <Loader loading={!data}>
        {hasInitialData ? (
          <>
            <RecipeCardList
              recipes={data?.data}
              onRecipeClick={onRecipeClick}
            />
            {[...new Array(page)].map((_, idx) => (
              <NetworkRecipeCardList
                key={['recipe-list', idx].join('_')}
                url={computedUrl}
              />
            ))}
            <Box textAlign="center" marginTop={3} marginBottom={3}>
              {data && canLoadMore && (
                <Button onClick={onLoadMore}>Load more</Button>
              )}
            </Box>
          </>
        ) : (
          noDataComponent
        )}
      </Loader>
    </section>
  );
};

PaginatedRecipeCardList.defaultProps = {
  limit: 30,
  noDataComponent: null
};

export default PaginatedRecipeCardList;
