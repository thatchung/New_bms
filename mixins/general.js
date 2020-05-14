export default {
    data() {
        return {
            
        }
    },
    methods: {
        get_excerpt(value,maxLength) {
            if(value == null)
                return null
            if(value.length > maxLength)
                return value.substr(0, maxLength) + '...';
            return value;
        },
    }
}