//混入
import {debounce} from "./untils";

export const imgListener = {
  data(){
    return{
      homeImgListener: null,
      refresh: null
    }
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.homeImgListener = () => {
        this.refresh()
      };
    this.$bus.$on('homeImgLoad', this.homeImgListener);
  }
};