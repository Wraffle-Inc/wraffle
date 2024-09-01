const IconLoader = (
  <svg xmlns='http://www.w3.org/2000/svg' style={{display: 'none'}}>
    <symbol id='arrow-right' viewBox='0 0 12 10'>
      <path
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='1.5'
        d='M11 5H1m10 0L7 9m4-4L7 1'
      />
    </symbol>

    <symbol id='arrow-left' viewBox='0 0 12 10'>
      <path
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='1.5'
        d='M1 5h10M1 5l4-4M1 5l4 4'
      />
    </symbol>

    <symbol id='arrow-bottom' viewBox='0 0 12 7'>
      <path
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='1.5'
        d='M1 1l5 5 5-5'
      />
    </symbol>

    <symbol id='menu' viewBox='0 0 24 24'>
      <path
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='1.5'
        d='M4 17h16M4 12h16M4 7h16'
      />
    </symbol>

    <symbol id='search' viewBox='0 0 19 19'>
      <path
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='1.5'
        d='M18 18l-4.197-4.197M16 8.5a7.5 7.5 0 1 0-15 0 7.5 7.5 0 0 0 15 0z'
      />
    </symbol>

    <symbol id='home' viewBox='0 0 18 19'>
      <path
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='1.5'
        d='M1 8l8-7 8 7v10h-5v-4a3 3 0 0 0-6 0v4H1V8z'
      />
    </symbol>

    <symbol id='gift' viewBox='0 0 18 19'>
      <path
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='1.5'
        d='M16 8.08v10H2v-10m14 0H2m14 0h1v-3H1v3h1m7-3c.833-1.833 3-5.5 5-3.5s-2.5 3.334-5 3.5zm0 0c-.833-1.833-3-5.5-5-3.5s2.5 3.334 5 3.5z'
      />
    </symbol>

    <symbol id='user-circle' viewBox='0 0 20 20'>
      <path
        stroke='currentColor'
        stroke-width='1.5'
        d='M16 16.708C16 15.088 14.828 13 13 13H7c-1.828 0-3 2.089-3 3.708M1 10a9 9 0 1 1 18 0 9 9 0 0 1-18 0zm12-3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'
      />
    </symbol>

    <symbol id='cart' viewBox='0 0 21 20'>
      <path
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='1.5'
        d='M1 1h2.5l2 14H16m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5.071 12H17l3-9H3.786M10 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0z'
      />
    </symbol>

    <symbol id='shopping-box' viewBox='0 0 18 19'>
      <path
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='1.5'
        d='M12 9a3 3 0 1 1-6 0m11-4l-2-4H3L1 5m16 0H1m16 0v11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5'
      />
    </symbol>

    <symbol id='setting' viewBox='0 0 20 20'>
      <path
        stroke='currentColor'
        stroke-width='1.5'
        d='M9 1h2a1 1 0 0 1 1 1v.569c0 .428.287.8.682.963.396.164.856.102 1.158-.2l.403-.403a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 0 1 0 1.414l-.402.403c-.303.302-.365.762-.201 1.158.164.395.535.682.963.682H18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-.569c-.428 0-.8.287-.963.682-.164.396-.102.856.2 1.158l.403.403a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 0 1-1.414 0l-.403-.402c-.302-.303-.762-.365-1.158-.201-.395.164-.682.535-.682.963V18a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-.569c0-.428-.287-.8-.682-.963-.396-.164-.856-.102-1.158.2l-.403.403a1 1 0 0 1-1.414 0L2.93 15.657a1 1 0 0 1 0-1.414l.402-.403c.303-.302.365-.762.201-1.158-.164-.395-.535-.682-.963-.682H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h.569c.428 0 .8-.287.963-.682.164-.395.102-.856-.2-1.158l-.403-.403a1 1 0 0 1 0-1.414L4.343 2.93a1 1 0 0 1 1.414 0l.403.402c.302.303.763.365 1.158.201.395-.164.682-.535.682-.963V2a1 1 0 0 1 1-1z'
      />
      <path
        stroke='currentColor'
        stroke-width='1.5'
        d='M12 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z'
      />
    </symbol>

    <svg
      id='plus'
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14 7.99805H8V13.998H6V7.99805H0V5.99805H6V-0.00195312H8V5.99805H14V7.99805Z'
        fill='black'
      />
    </svg>

    <symbol id='bell' viewBox='0 0 24 24'>
      <path
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9zm-4.27 13a1.999 1.999 0 0 1-3.46 0'
      />
    </symbol>

    <symbol id='bookmark' viewBox='0 0 24 24'>
      <path
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='1.5'
        d='M6 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v15l-6-6-6 6V6z'
      />
    </symbol>

    <symbol id='bookmark-fill' viewBox='0 0 24 24'>
      <path d='M0 0h24v24H0z' />
      <path
        fill='currentColor'
        d='M6 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v15l-6-6-6 6V6z'
      />
      <path
        stroke='#000'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='1.5'
        d='M6 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v15l-6-6-6 6V6z'
      />
    </symbol>

    <symbol id='heart' viewBox='0 0 20 18'>
      <path
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='1.5'
        d='M2.331 9.047L10 17l7.669-7.953A4.804 4.804 0 0 0 19 5.714C19 3.111 16.965 1 14.454 1a4.465 4.465 0 0 0-3.214 1.38L10 3.668 8.76 2.38A4.465 4.465 0 0 0 5.546 1C3.036 1 1 3.11 1 5.714c0 1.25.479 2.45 1.331 3.333z'
      />
    </symbol>

    <symbol id='heart-fill' viewBox='0 0 20 18'>
      <path
        fill='currentColor'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='1.5'
        d='M2.331 9.047L10 17l7.669-7.953A4.804 4.804 0 0 0 19 5.714C19 3.111 16.965 1 14.454 1a4.465 4.465 0 0 0-3.214 1.38L10 3.668 8.76 2.38A4.465 4.465 0 0 0 5.546 1C3.036 1 1 3.11 1 5.714c0 1.25.479 2.45 1.331 3.333z'
      />
    </symbol>

    <symbol id='user' viewBox='0 0 24 24'>
      <path
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'
      />
    </symbol>

    <svg
      id='credit-card'
      width='20'
      height='15'
      viewBox='0 0 20 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M18.2353 14.1176H1.76471C0.823529 14.1176 0 13.2941 0 12.3529V1.76471C0 0.823529 0.823529 0 1.76471 0H18.2353C19.1765 0 20 0.823529 20 1.76471V12.3529C20 13.2941 19.1765 14.1176 18.2353 14.1176ZM1.76471 1.17647C1.41176 1.17647 1.17647 1.41176 1.17647 1.76471V12.3529C1.17647 12.7059 1.41176 12.9412 1.76471 12.9412H18.2353C18.5882 12.9412 18.8235 12.7059 18.8235 12.3529V1.76471C18.8235 1.41176 18.5882 1.17647 18.2353 1.17647H1.76471Z'
        fill='black'
      />
      <path
        d='M19.4118 2.70593H0.588257V3.8824H19.4118V2.70593Z'
        fill='black'
      />
      <path
        d='M19.4118 4.82349H0.588257V5.99996H19.4118V4.82349Z'
        fill='black'
      />
      <path
        d='M6.11764 8.70589H3.05882C2.70588 8.70589 2.47058 8.4706 2.47058 8.11765C2.47058 7.76471 2.70588 7.52942 3.05882 7.52942H6.11764C6.47058 7.52942 6.70588 7.76471 6.70588 8.11765C6.70588 8.4706 6.47058 8.70589 6.11764 8.70589Z'
        fill='black'
      />
      <path
        d='M10.2353 11.1765H3.05882C2.70588 11.1765 2.47058 10.9412 2.47058 10.5882C2.47058 10.2353 2.70588 10 3.05882 10H10.2353C10.5882 10 10.8235 10.2353 10.8235 10.5882C10.8235 10.9412 10.4706 11.1765 10.2353 11.1765Z'
        fill='black'
      />
    </svg>

    <symbol id='upload' viewBox='0 0 20 20'>
      <path
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M19 11.125v5.625A2.25 2.25 0 0 1 16.75 19H3.25A2.25 2.25 0 0 1 1 16.75v-5.625M14.5 5.5L10 1m0 0L5.5 5.5M10 1v13.5'
      />
    </symbol>

    <symbol id='calendar' viewBox='0 0 24 24'>
      <path
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-3-2v4M8 2v4m-5 4h18'
      />
    </symbol>

    <symbol id='write' viewBox='0 0 19 18'>
      <path
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='1.5'
        d='M12 3l3 3m-5 11h8M2 13l-1 4 4-1L16.586 4.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0L2 13z'
      />
    </symbol>
  </svg>
);

export default IconLoader;

// export default function GlobalSVGProvider() {
//   return createPortal(spliteSvg, document.body);
// }
