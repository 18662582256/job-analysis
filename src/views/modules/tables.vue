<template>
    <div class="table-content">
        <el-table :data="tableData" height="250" border style="width: 100%">
            <el-table-column prop="publisherMonth" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="company" label="公司">
            </el-table-column>
            <el-table-column prop="position" label="岗位"> </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData2: [],
        };
    },
    props: {
        tableData: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
};
</script>

<style scoped>
.table-content {
    width: 100%;
    height: 100%;
}
>>>.el-table,
>>>.el-table tr,
>>>.el-table th,
>>>.el-table td{
    background-color: transparent  !important;
    color: #fff;
}
</style>