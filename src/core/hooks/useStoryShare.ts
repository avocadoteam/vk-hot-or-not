import { appId } from '@core/constants';
import { captureUrlEvent } from '@core/sentry';
import { addToastToQueue } from '@core/ui-config/effects.uic';
import { ToastId } from '@core/ui-config/types';
import { errMap, getImage, wrapAsset } from '@core/utils';
import { vkBridge } from '@core/vk-bridge/instance';
import { useCallback, useState } from 'react';

const generateImg = async (percent: number) => {
  const background = await getImage(wrapAsset(`/story/story.png`));
  const indicator = await getImage(wrapAsset(`/story/indicator.png`));
  const indicatorY = 761 - ((761 - 73) / 100) * percent;

  const canvas = document.createElement('canvas') as HTMLCanvasElement;
  canvas.width = background.width;
  canvas.height = background.height;
  const ctx = canvas.getContext('2d')!;

  ctx.drawImage(background, 0, 0);
  ctx.drawImage(indicator, 98 - 8, indicatorY);

  ctx.fillStyle = '#FF2E00';
  ctx.beginPath();

  (ctx as any).roundRect(160, 465, percent < 10 ? 85 : percent < 100 ? 109 : 133, 66, 24);
  ctx.fill();

  ctx.font = '35px SF Pro Rounded';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`${percent}%`, 176, 481 + 28);

  return canvas.toDataURL('image/png');
};

export const useStoryShare = (userId: number, percent: number) => {
  const [clicked, setClicked] = useState(false);

  const shareStory = useCallback(async () => {
    try {
      setClicked(true);
      const blob = await generateImg(percent);
      vkBridge.send('VKWebAppShowStoryBox', {
        attachment: {
          text: 'open',
          id: 1,
          type: 'url',
          url: `https://vk.com/app${appId}#${userId}`,
        },
        background_type: 'image',
        blob,
      });
    } catch (e) {
      console.error(e);
      captureUrlEvent(`Error in share story ${errMap(e)}`);
      addToastToQueue({
        id: ToastId.StoryShare,
        toast: {
          type: 'error',
          title: 'Не удалось создать сторис',
        },
      });
    } finally {
      setClicked(false);
    }
  }, [percent, userId]);

  return {
    shareStory,
    clicked,
  };
};
