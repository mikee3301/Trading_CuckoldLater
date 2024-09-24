function parseNumber(id) {
  const value = parseFloat(document.getElementById(id).value);
  return isNaN(value) ? 0 : value;
}

function validatePercentSum() {
  const Per_1 = parseNumber('Percent_1');
  const Per_2 = parseNumber('Percent_2');
  const Per_3 = parseNumber('Percent_3');
  const Per_4 = parseNumber('Percent_4');
  const Per_5 = parseNumber('Percent_5');
  
  const sum = Per_1 + Per_2 + Per_3 + Per_4 + Per_5;
  
  const fields = [
    document.getElementById('Percent_1'),
    document.getElementById('Percent_2'),
    document.getElementById('Percent_3'),
    document.getElementById('Percent_4'),
    document.getElementById('Percent_5')
  ];
  
  if (sum !== 100) {
    fields.forEach(field => field.style.backgroundColor = 'rgba(255, 121, 121, 0.5)');
  } else {
    fields.forEach(field => field.style.backgroundColor = ''); 
  }
}

function calculate() {
  var inputs = document.querySelectorAll('.inp');
  inputs.forEach(function(input) {
      input.addEventListener('focus', function() {
          if (this.value == 0) {
              this.value = '';
          }
      });

      input.addEventListener('blur', function() {
          if (this.value === '') {
              this.value = 0;
          }
      });
  });

  const Per_1 = parseNumber('Percent_1');
  const Per_2 = parseNumber('Percent_2');
  const Per_3 = parseNumber('Percent_3');
  const Per_4 = parseNumber('Percent_4');
  const Per_5 = parseNumber('Percent_5');
  
  const Pri_1 = parseNumber('Price_1');
  const Pri_2 = parseNumber('Price_2');
  const Pri_3 = parseNumber('Price_3');
  const Pri_4 = parseNumber('Price_4');
  const Pri_5 = parseNumber('Price_5');
  
  const Copy_EP = parseNumber('Copy_Entry_price');
  const Copy_EntryVolCoin = parseNumber('Copy_EntryVolCoin');
  
  const Risk = parseNumber('Risk');
  const Depo = parseNumber('Deposit');
  var EP = parseNumber('Entry_price');
  const SL = parseNumber('Stop_loss');
  
  const RR_Std = parseNumber('RR_Standard');
  const SL_Part = parseNumber('StopLossPart');
  const FixPer = parseNumber('FixedPercent');
  const toggleSwitch2 = document.getElementById('toggleSwitch2');
  
  const toggleSwitch = document.getElementById('toggleSwitch');
  var StopLossPerc;
  var EntryVolCoin;
  var EntryVol;
  if (toggleSwitch.checked) {
    EP = Copy_EP
    StopLossPerc = Math.abs((EP - SL) / EP * 100);
    EntryVolCoin = Copy_EntryVolCoin;
    EntryVol = EntryVolCoin*EP;
  } else {
    StopLossPerc = Math.abs((EP - SL) / EP * 100);
    EntryVol = (Risk * Depo) / StopLossPerc;
    EntryVolCoin = EntryVol / EP;
  }

  const AVGTP = (Per_1 * Pri_1 + Per_2 * Pri_2 + Per_3 * Pri_3 + Per_4 * Pri_4 + Per_5 * Pri_5) / 100;
  const TakeProfitPerc = Math.abs(((AVGTP - EP) / EP * 100));
  const TakeProfit = EntryVol * TakeProfitPerc / 100;
  const TakeProfitDepo = TakeProfit * 100 / Depo;
  const RR = 1 / (StopLossPerc / TakeProfitPerc);
  
  const ExitVol_1 = Per_1 * EntryVolCoin / 100;
  const ExitVol_2 = Per_2 * EntryVolCoin / 100;
  const ExitVol_3 = Per_3 * EntryVolCoin / 100;
  const ExitVol_4 = Per_4 * EntryVolCoin / 100;
  const ExitVol_5 = Per_5 * EntryVolCoin / 100;
  
  const Profit_1 = (EntryVol * Per_1 / 100) * (Math.abs(((Pri_1 - EP) / EP * 100))) / 100;
  const Profit_2 = (EntryVol * Per_2 / 100) * (Math.abs(((Pri_2 - EP) / EP * 100))) / 100;
  const Profit_3 = (EntryVol * Per_3 / 100) * (Math.abs(((Pri_3 - EP) / EP * 100))) / 100;
  const Profit_4 = (EntryVol * Per_4 / 100) * (Math.abs(((Pri_4 - EP) / EP * 100))) / 100;
  const Profit_5 = (EntryVol * Per_5 / 100) * (Math.abs(((Pri_5 - EP) / EP * 100))) / 100;
  
  
  var Rcmnd_TP = 0;
  var Payback = 0;
  if (EP>SL) {
    Rcmnd_TP = EP+((EP*StopLossPerc)/100*RR_Std);
    Payback = EP+(EP*StopLossPerc/100);
  } else {
    Rcmnd_TP = EP-((EP*StopLossPerc)/100*RR_Std);
    Payback = EP-(EP*StopLossPerc/100);
  }
  const EP_for_RR = (RR_Std*SL+AVGTP)/(RR_Std+1)
  
  var Source_Plus_Minus = 0;
  if (toggleSwitch2.checked) {
    Source_Plus_Minus = FixPer;
  } else {
    Source_Plus_Minus = StopLossPerc/SL_Part;
    document.getElementById('FixedPercent').value = Source_Plus_Minus.toFixed(6);
  }
  
  const EP_plus = EP+(EP*Source_Plus_Minus/100);
  const EP_minus = EP-(EP*Source_Plus_Minus/100);
  const RR_plus = 1/(Math.abs((EP_plus-SL)/EP_plus*100)/Math.abs(((AVGTP-EP_plus)/EP_plus*100)));
  const RR_minus = 1/(Math.abs((EP_minus-SL)/EP_minus*100)/Math.abs(((AVGTP-EP_minus)/EP_minus*100)));
  
  document.getElementById('Rcmnd_TP').innerText = Rcmnd_TP.toFixed(4);
  document.getElementById('EP_for_RR').innerText = EP_for_RR.toFixed(4);
  document.getElementById('Payback').innerText = Payback.toFixed(4);
  document.getElementById('EP_plus').innerText = EP_plus.toFixed(4);
  document.getElementById('EP_minus').innerText = EP_minus.toFixed(4);
  document.getElementById('RR_plus').innerText = RR_plus.toFixed(4);
  document.getElementById('RR_minus').innerText = RR_minus.toFixed(4);
  
  document.getElementById('StopLossPerc').innerText = StopLossPerc.toFixed(4);
  document.getElementById('EntryVol').innerText = EntryVol.toFixed(4);
  document.getElementById('EntryVolCoin').innerText = EntryVolCoin.toFixed(6);
  document.getElementById('AVGTP').innerText = AVGTP.toFixed(4);
  document.getElementById('TakeProfitPerc').innerText = TakeProfitPerc.toFixed(4);
  document.getElementById('TakeProfit').innerText = TakeProfit.toFixed(4);
  document.getElementById('TakeProfitDepo').innerText = TakeProfitDepo.toFixed(4);
  document.getElementById('RR').innerText = RR.toFixed(4);
  
  document.getElementById('ExitVol_1').innerText = ExitVol_1.toFixed(6);
  document.getElementById('ExitVol_2').innerText = ExitVol_2.toFixed(6);
  document.getElementById('ExitVol_3').innerText = ExitVol_3.toFixed(6);
  document.getElementById('ExitVol_4').innerText = ExitVol_4.toFixed(6);
  document.getElementById('ExitVol_5').innerText = ExitVol_5.toFixed(6);
  
  document.getElementById('Profit_1').innerText = Profit_1.toFixed(4);
  document.getElementById('Profit_2').innerText = Profit_2.toFixed(4);
  document.getElementById('Profit_3').innerText = Profit_3.toFixed(4);
  document.getElementById('Profit_4').innerText = Profit_4.toFixed(4);
  document.getElementById('Profit_5').innerText = Profit_5.toFixed(4);

  
  validatePercentSum();
  
  
  if (RR < 1) {
    document.getElementById('RR').style.backgroundColor = 'rgba(255, 121, 121, 0.25)';
  } else {
    document.getElementById('RR').style.backgroundColor = ''; 
  }
}

document.getElementById('Percent_1').addEventListener('input', calculate);
document.getElementById('Percent_2').addEventListener('input', calculate);
document.getElementById('Percent_3').addEventListener('input', calculate);
document.getElementById('Percent_4').addEventListener('input', calculate);
document.getElementById('Percent_5').addEventListener('input', calculate);

document.getElementById('Price_1').addEventListener('input', calculate);
document.getElementById('Price_2').addEventListener('input', calculate);
document.getElementById('Price_3').addEventListener('input', calculate);
document.getElementById('Price_4').addEventListener('input', calculate);
document.getElementById('Price_5').addEventListener('input', calculate);

document.getElementById('Copy_Entry_price').addEventListener('input', calculate);
document.getElementById('Copy_EntryVolCoin').addEventListener('input', calculate);

document.getElementById('Risk').addEventListener('input', calculate);
document.getElementById('Deposit').addEventListener('input', calculate);
document.getElementById('Entry_price').addEventListener('input', calculate);
document.getElementById('Stop_loss').addEventListener('input', calculate);

document.getElementById('RR_Standard').addEventListener('input', calculate);
document.getElementById('StopLossPart').addEventListener('input', calculate);
document.getElementById('FixedPercent').addEventListener('input', calculate);
document.getElementById('toggleSwitch2').addEventListener('change', calculate);

function copyInputValue() {
  const Risk = parseNumber('Risk');
  const Depo = parseNumber('Deposit');
  const EP = parseNumber('Entry_price');
  const SL = parseNumber('Stop_loss');
  
  const StopLossPerc = Math.abs((EP - SL) / EP * 100);
  const EntryVol = (Risk * Depo) / StopLossPerc;
  const EntryVolCoin = EntryVol / EP;
  
  const Copy_Entry_price = document.getElementById('Copy_Entry_price');
  Copy_Entry_price.value = EP
  
  const Copy_EntryVolCoin = document.getElementById('Copy_EntryVolCoin');
  Copy_EntryVolCoin.value = EntryVolCoin.toFixed(6)
  
  calculate();
}
document.getElementById('copyButton').addEventListener('click', copyInputValue);


function DelRec() {
const toggleSwitch = document.getElementById('toggleSwitch');
const rec = document.querySelector('.rec');

  if (toggleSwitch.checked) {
    rec.style.display = 'none';
  } else {
    rec.style.display = 'block';
  }
calculate();
}
document.getElementById('toggleSwitch').addEventListener('change', DelRec);



function copyToClipboard(text) {
  const tempInput = document.createElement("input");
  document.body.appendChild(tempInput);
  tempInput.value = text;
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

document.querySelectorAll('.result').forEach(function (resultField) {
    resultField.addEventListener('click', function () {
        const textToCopy = resultField.innerText;
        copyToClipboard(textToCopy);
        
        const originalColor = resultField.style.backgroundColor;
        resultField.style.backgroundColor = '#515151';
        
        setTimeout(function () {
            resultField.style.backgroundColor = originalColor;
        }, 300);
    });
});
