<template>
  <div>
    <remote-select
      :value="value"
      @input="change"
      :remote-data="remoteData"
      :multiple="multiple"
      :placeholder="placeholder"
      track-by="id"
      :label="label"
      :loadbefore="loadbefore"
      :searchable="search"
    >
      <div slot="item" slot-scope="{data}">
        <span v-if="data.id">{{data.id}}</span>
        <span v-else>{{data.name}}</span>
      </div>
    </remote-select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {

  name: "SelectList",
  props: {
    value: null,
    service: {
      type: String,
      default: "review"
    },
    label: {
      type: String,
      default: "name"
    },
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "Tìm kiếm"
    },
    state: {
      type: String,
      default: "active"
    },
    name: {
      type: String
    },
    search: {
      type: Boolean,
      default: true
    },
    searchname: {
      type: String,
      default: "name"
    },
    loadbefore: {
      type: Boolean,
      default: false
    },
    shownotfounditem: {
      type: Boolean,
      default: false
    },
    numget: {
      type: Number,
      default: 10
    },
    choiceInactive: {
      type: Boolean,
      default: true
    },
    list_filter_object: {
      type: Object
    },
    "update-tags": {
      type: Function
    },
    "update-place": {
      type: Function
    }
  },

  methods: {
    ...mapActions({
      callGetActionPage: "common/callGetActionPage",
    }),
    change: function(value) {
      if (value) {
        this.$emit("input", value);

        if (typeof this.updateTags === "function") {
          this.updateTags(value);
        }
        if (typeof this.updatePlace === "function") {
          this.updatePlace(value);
        }
      } else {
        this.$emit("input", {
          id: null,
          name: null
        });
      }
    },
    remoteData: async function(query) {
      let self = this;
      var filterData = {};
      if (this.list_filter_object) {
        filterData = this.list_filter_object;
      }
      filterData.page = 1;
      filterData.page_size = this.numget;

      if (query) {
        var name = this.searchname;
        filterData[name] = query;
      }

      let r = await this.callGetActionPage({
        url: this.name,
        params: filterData
      });

      if (!r.meta.success) return [];
      if (r.data.length > 0) {
        let listkq = [];
        r.data.forEach(element => {
          if (element.id) {
            let temp_item = {
              id: element.id
            };
            temp_item[this.label] =
              element[this.label] && element[this.label].length > 100
                ? element[this.label].substring(0, 100)
                : element[this.label];
            // if (
            //   self.choiceInactive &&
            //   element.state &&
            //   element.state == "inactive"
            // )
            //   temp_item["$isDisabled"] = true;
            listkq.push(temp_item);
          }
        });

        return listkq;
      } else {
        if (this.shownotfounditem) {
          console.log("found")
          return [
            {
              id: -1,
              name: query
            }
          ];
        } else {
          console.log("No item found")
          return [];
        }
      }
    }
  },
  mounted: function() {}
};
</script>