<template>
<div>
    {{isAdmin}}

</div>
</template>
<script>
    export default {
        data () {
            return {
                isAdmin : this.$auth.user().is_admin
            }
        }
    }
</script>
