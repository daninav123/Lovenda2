import React from 'react';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { t } = useTranslation(['common', 'tasks', 'finance']);

  return (
    <div>
      <h1>{t('common.hello')}</h1>
      <p>{t('tasks.title')}</p>
      <p>{t('finance.balance')}</p>
    </div>
  );
};

export default App;
