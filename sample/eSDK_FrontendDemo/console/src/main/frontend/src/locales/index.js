/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import Backend from 'i18next-xhr-backend';
import i18next from 'i18next';

const i18n = i18next
  .use(Backend)
  .init(
    {
      backend: {
        loadPath:'locales/error.zh-CN.json'
      }
    }
  );

export default i18n;
