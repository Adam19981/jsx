import AMapLoader from '@amap/amap-jsapi-loader';

class mapPublic {
    mapExample = null;
    map = null;
    async createMap(id) {
        this.mapExample = await AMapLoader.load({
            key: "67d8bee1ac1651e1117725a5efe39a47",
            version: "2.0",
            plugins: [''],
        })
        this.map = new this.mapExample.Map(id, {
            mapStyle: 'amap://styles/darkblue',
            resizeEnable: true,
            zoom: 15,
            center: [120.699279, 27.993849]
        })
    }
}

export const mapManager = new mapPublic()