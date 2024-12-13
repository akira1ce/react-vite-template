// // yarn add react-diff-viewer react-window
// import React, { CSSProperties, memo, useMemo } from 'react';
// import DiffViewer from 'react-diff-viewer';
// import { FixedSizeList as List } from 'react-window';

// const splitText = (text: string) => text.split('\n');

// export interface LargeTextDiffViewerProps {
//   oldText: string;
//   newText: string;
//   height?: number;
//   itemSize?: number;
//   splitBy?: string;
//   className?: string;
//   wrapperStyle?: CSSProperties;
// }

// const LargeTextDiffViewer = (props: LargeTextDiffViewerProps) => {
//   const { oldText, newText, className, wrapperStyle, height = 400, itemSize = 35 } = props;

//   const oldTextLines = useMemo(() => splitText(oldText), [oldText]);
//   const newTextLines = useMemo(() => splitText(newText), [newText]);

//   const itemCount = Math.max(oldTextLines.length, newTextLines.length);

//   const renderRow = ({ index, style }: any) => {
//     const oldValue = oldTextLines[index] || '';
//     const newValue = newTextLines[index] || '';

//     return (
//       <div style={style}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <DiffViewer oldValue={oldValue} newValue={newValue} hideLineNumbers />
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className={className} style={{ ...wrapperStyle, width: '100%' }}>
//       <List height={height} itemCount={itemCount} itemSize={itemSize} width="100%">
//         {renderRow}
//       </List>
//     </div>
//   );
// };

// export default memo(LargeTextDiffViewer);
