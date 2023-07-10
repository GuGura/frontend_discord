import accessHeader from "@/script/axios/jwt/accessHeader";
import refreshHeader from "@/script/axios/jwt/refreshHeader";

import BaseURL from "@/script/axios/BaseURL";

class initJwt {
    async checkRefreshJwt() {
        return await BaseURL.put("api/v2/check-refreshToken", null, {headers: refreshHeader()})
            .then((res) => {
                const accessJwt = res.headers.get('accessJwt');
                const refreshJwt = res.headers.get('refreshJwt')
                const token = {accessJwt: accessJwt, refreshJwt: refreshJwt}
                localStorage.setItem(`token`, JSON.stringify(token)) //토큰 저장까지 확인
                return true;
            }).catch(() => {
                localStorage.removeItem('token');
                return false;
            })
    }

    async checkAccessJwt() {
        return await BaseURL.put("api/v2/check-token", null, {headers: accessHeader()})
            .then(() => {return true;})
            .catch(() => {return this.checkRefreshJwt()})
    }
}
export default new initJwt();