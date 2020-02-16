<template>

     <Dropdown style="margin-left: 20px"  v-if="$auth.check()">
        <a href="javascript:void(0)">
            <Icon type="md-person" />
            {{ this.$auth.user().name }}
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">

            <DropdownItem @click.native="$auth.logout()">登出</DropdownItem>

        </DropdownMenu>
    </Dropdown>
</template>
<script>
export default {

}
</script>
