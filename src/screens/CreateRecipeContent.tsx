import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import axios from 'axios';

import PageHeader from '~/components/Global/PageHeader';
import RecipeForm from '~/components/Recipes/RecipeForm';

interface RecipePayload {
  title: string;
  description: string;
  time: string;
  public: boolean;
}

const CreateRecipeContent: React.FC = () => {
  const { user } = useUser();

  const onSubmit = (data: RecipePayload): void => {
    axios.post('/api/recipes/create', { ...data, author: user?.sub });
  };

  const [imageSrc, setImageSrc] = useState('');
  const onImageChange = (src: string) => setImageSrc(src);

  return (
    <div>
      <PageHeader title="Create recipe" />
      <RecipeForm
        onSubmit={onSubmit}
        imageSrc={imageSrc}
        onImageSave={onImageChange}
      />
    </div>
  );
};

export default CreateRecipeContent;
