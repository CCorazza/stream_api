<xignite-card>
  <div class="demo-card-square mdl-card mdl-shadow--2dp">  
    <div class="mdl-card__title mdl-card--expand">    
      <h1>{rate.Mid}</h1>
    </div>
    <div class="mdl-card__title">
        <h4 class="mdl-card__title-text">{rate.BaseCurrency} / {rate.QuoteCurrency}</h4>
    </div>
    <div class="mdl-card__supporting-text" style="text-align: right; color: rgb(3, 169, 244);">
      {rate.Date} {rate.Time}
    </div>
    <div class="mdl-card__supporting-text">
      {rate.Text}
    </div>
  </div>

  <script>
    var self = this; 

    opts.bus.on(opts.currency, function(rate) {
      self.rate = rate;
      self.update();
    });
  </script>

  <style>
    .demo-card-square {
      margin: 10px;
    }
    .demo-card-square.mdl-card {
      width: 300px;
      height: 270px;
    }
    .demo-card-square > .mdl-card__title {
      max-height: 100px;
      color: #fff;
      background: rgb(33,150,243);
    }
    .mdl-card__supporting-text {
      width: 95%;
      padding: 5px;
      font-size: 14px;
    }
    .mdl-card__supporting-text-back {
      text-align: center;
      padding:10px; 
      line-height:150%;
    }
    .mdl-card__title > h1 {
      margin: 10px 0px 10px 0px;
    }
  </style>
</xignite-card>

<!-- at reception of event, set the rate as internal field component and set riot.js expressions to display it -->
