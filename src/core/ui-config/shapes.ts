import { Form, Toast } from './types';

export const codeErrorToToast = (form?: Form, text?: string, data?: any): Pick<Toast, 'text' | 'title'> => {
  return formError(form, text, data);
};
export const successToToast = (form?: Form, data?: any): Toast => {
  switch (form) {
    case 'location':
      if (!data.geo.available) {
        return {
          title: 'Не удалось получить геоданные',
          type: 'error',
        };
      }
      return {
        title: 'Геоданные получены',
        type: 'success',
      };
    default:
      return {
        title: 'Изменения сохранены',
        type: 'success',
      };
  }
};

const formError = (form?: Form, text?: string, data?: any): Pick<Toast, 'text' | 'title'> => {
  switch (form) {
    case 'location':
      return {
        title:
          data?.error_data?.error_reason === 'User denied'
            ? 'Доступ к геолокации заблокирован'
            : 'Не удалось получить геоданные',
        text,
      };

    default:
      return {
        title: 'Что-то пошло не так...',
      };
  }
};
