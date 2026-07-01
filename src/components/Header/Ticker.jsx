const Ticker = () => {
  return (
    <div className="bg-[#cc0000] text-white overflow-hidden whitespace-nowrap py-1.5 shadow-md w-full">
      <div className="w-full px-4 lg:px-8 xl:px-12 flex items-center h-8 relative">
        {/* Breaking Badge */}
        <div className="bg-white text-[#cc0000] font-black px-3 py-1 text-[11px] rounded uppercase tracking-wider shrink-0 mr-4 z-10 shadow-sm relative flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-[#cc0000] animate-pulse"></span>
          <span>BREAKING</span>
        </div>
        
        {/* Scrolling text container */}
        <div className="flex-1 overflow-hidden relative h-full flex items-center">
          <div className="animate-[ticker_30s_linear_infinite] inline-block font-semibold text-[14px]">
            <span className="mx-4">• ఈ నిర్మాణ పనులపై సీఎం సమీక్ష</span>
            <span className="mx-4">• రాజన్న సిరిసిల్ల జిల్లా లో తీవ్ర విషాదం..</span>
            <span className="mx-4">• రాష్ట్రంలో మండిపోతున్న ఎండలు..</span>
            <span className="mx-4">• సెజ్ చైర్మన్ చిక్కాల రామారావుకు పుత్రశోకం..</span>
            <span className="mx-4">• అమరావతి నిర్మాణ పనులపై సీఎం సమీక్ష</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticker;
