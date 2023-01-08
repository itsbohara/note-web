type delayProps = {
  useMS?: boolean;
};
/**
 *
 * @param time by default takes time in seconds
 * @param props delay option parameter
 * @returns
 */
export function delay(time, props?: delayProps) {
  if (!props?.useMS) time = time * 1000;
  return new Promise((resolve) => setTimeout(resolve, time));
}
