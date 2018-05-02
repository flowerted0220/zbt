<template>
    <div class="innerPanel">
        <div class="innerHeader">
            <div class="blocks block_1 normalType">
                <div class="infoFrame">
                    <div class="infos title">{{$t("case_online_capacity")}}</div>
                    <div class="infos data">123</div>
                    <div class="infos unit">kWp</div>
                </div>
            </div>
            <div class="blocks block_1 normalType">
                <div class="infoFrame">
                    <div class="infos title">{{$t("case_online_count")}}</div>
                    <div class="infos data halfType">123</div><div class="infos data halfType">456</div>
                    <div class="infos unit halfType">{{$t("unit_case")}}</div><div class="infos unit halfType">{{$t("unit_case")}}</div>
                </div>
            </div>
            <div class="blocks block_1 normalType">
                <div class="infoFrame">
                    <div class="infos title">{{$t("case_online_rate")}}</div>
                    <div class="infos data">123</div>
                    <div class="infos unit">%</div>
                </div>
            </div>
            <div class="blocks block_1 normalType">
                <div class="infoFrame">
                    <div class="infos title">{{$t("case_this_month_appr_rate")}}</div>
                    <div class="infos data">123</div>
                    <div class="infos unit">%</div>
                </div>
            </div>
            <div class="blocks block_1 normalType">
                <div class="infoFrame">
                    <div class="infos title">{{$t("case_this_year_appr_rate")}}</div>
                    <div class="infos data">123</div>
                    <div class="infos unit">%</div>
                </div>
            </div>
            <div class="blocks block_1 normalType">
                <div class="infoFrame">
                    <div class="infos title">{{$t("case_this_month_avai_rate")}}</div>
                    <div class="infos data">123</div>
                    <div class="infos unit">%</div>
                </div>
            </div>
            <div class="blocks block_1 normalType">
                <div class="infoFrame">
                    <div class="infos title">{{$t("case_yesterday_avai_rate")}}</div>
                    <div class="infos data">123</div>
                    <div class="infos unit">%</div>
                </div>
            </div>
        </div>
        <div class="innerBody">
            <div class="panels dashboard">
                <div class="tableHeader">
                    <table>
                        <colgroup>
                            <col style="width: 2%;" />
                            <col style="width: 3.5%" />
                            <col style="width: 5%" />
                            <col style="width: 5%" />
                            <col style="width: 5%" />
                        </colgroup>
                        <tr>
                            <th>{{456}}</th>
                            <th>{{456}}</th>
                            <th>{{123}}</th>
                            <th>{{456}}</th>
                            <th>{{123}}</th>
                        </tr>
                    </table>
                </div>
                <div class="tableBody">
                    <table>
                        <colgroup>
                            <col style="width: 2%;" />
                            <col style="width: 3.5%" />
                            <col style="width: 5%" />
                            <col style="width: 5%" />
                            <col style="width: 5%" />
                        </colgroup>
                        <tr>
                            <td>{{555}}</td>
                            <td>{{666}}</td>
                            <td>{{555}}</td>
                            <td>{{666}}</td>
                            <td>{{555}}</td>        
                        </tr>                  
                    </table>
                </div>
            </div>
            <div class="panels map">
               <div id="AA" style="width:100%;height:400px"></div>
            </div>
            <button @click="aa"></button>
            <div class="panels chart"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
var map;
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({})
  },
  created() {},
  methods: {
    ...mapActions([""]),
    aa() {
      map = new google.maps.Map(document.getElementById("AA"), {
        zoom: 10,
        center: { lat: 25.0136906, lng: 121.5406792 }
      });
    }
  }
};
</script>
<style>

</style>
