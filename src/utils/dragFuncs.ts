export const dragStartHandler = (
  e: React.DragEvent<HTMLDivElement>,
  component: string
) => {
  e.dataTransfer.setData('text', component)
}
