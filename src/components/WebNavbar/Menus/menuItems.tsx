interface ChildLinks {
    label:string,
    href:string
}

interface Child {
    id:number,
    heading:string,
    childLinks:ChildLinks[]
}

interface MenuItemsTypes {
    id:number,
    label:string,
    href:string,
    child:Child[]
}

export const MenuItems : MenuItemsTypes[] = [
    {
        id:1,
        label:'Men',
        href:'/men',
        child:[
            {
                id:2,
                heading:'Featured',
                childLinks: [
                    {
                        label:'New Releases',
                        href:'/NewReleases'
                    },
                    {
                        label:'Air Force 1',
                        href:'/'
                    },
                    {
                        label:'Sale',
                        href:'/'
                    },
                    {
                        label:'Football Club',
                        href:'/'
                    }
                ]   
            },
            {
                id:3,
                heading:'Shoes',
                childLinks: [
                    {
                        label:'New Releases',
                        href:'/NewReleases'
                    },
                    {
                        label:'Air Force 1',
                        href:'/'
                    },
                    {
                        label:'Sale',
                        href:'/'
                    },
                    {
                        label:'Football Club',
                        href:'/'
                    }
                ]   
            },
            {
                id:4,
                heading:'Shoes',
                childLinks: [
                    {
                        label:'New Releases',
                        href:'/NewReleases'
                    },
                    {
                        label:'Air Force 1',
                        href:'/'
                    },
                    {
                        label:'Sale',
                        href:'/'
                    },
                    {
                        label:'Football Club',
                        href:'/'
                    }
                ]   
            },
            {
                id:5,
                heading:'Shoes',
                childLinks: [
                    {
                        label:'New Releases',
                        href:'/NewReleases'
                    },
                    {
                        label:'Air Force 1',
                        href:'/'
                    },
                    {
                        label:'Sale',
                        href:'/'
                    },
                    {
                        label:'Football Club',
                        href:'/'
                    }
                ]   
            }
        ]
    },
    {
        id:6,
        label:'Woman',
        href:'/men',
        child:[
            {
                id:7,
                heading:'Featured',
                childLinks: [
                    {
                        label:'New Releases',
                        href:'/'
                    },
                    {
                        label:'Air Force 1',
                        href:'/'
                    },
                    {
                        label:'Sale',
                        href:'/'
                    },
                    {
                        label:'Football Club',
                        href:'/'
                    }
                ]   
            },
            {
                id:8,
                heading:'Shoes',
                childLinks: [
                    {
                        label:'New Releases',
                        href:'/NewReleases'
                    },
                    {
                        label:'Air Force 1',
                        href:'/'
                    },
                    {
                        label:'Sale',
                        href:'/'
                    },
                    {
                        label:'Football Club',
                        href:'/'
                    }
                ]   
            },
            {
                id:9,
                heading:'Shoes',
                childLinks: [
                    {
                        label:'New Releases',
                        href:'/NewReleases'
                    },
                    {
                        label:'Air Force 1',
                        href:'/'
                    },
                    {
                        label:'Sale',
                        href:'/'
                    },
                    {
                        label:'Football Club',
                        href:'/'
                    }
                ]   
            },
            {
                id:10,
                heading:'Shoes',
                childLinks: [
                    {
                        label:'New Releases',
                        href:'/NewReleases'
                    },
                    {
                        label:'Air Force 1',
                        href:'/'
                    },
                    {
                        label:'Sale',
                        href:'/'
                    },
                    {
                        label:'Football Club',
                        href:'/'
                    }
                ]   
            }
        ]
    },
    {
        id:11,
        label:'Kids',
        href:'/Kids',
        child:[
            {
                id:12,
                heading:'Kids',
                childLinks: [
                    {
                        label:'New Releases',
                        href:'/'
                    },
                    {
                        label:'Air Force 1',
                        href:'/'
                    },
                    {
                        label:'Sale',
                        href:'/'
                    },
                    {
                        label:'Football Club',
                        href:'/'
                    }
                ]   
            },
            {
                id:13,
                heading:'Shoes',
                childLinks: [
                    {
                        label:'New Releases',
                        href:'/NewReleases'
                    },
                    {
                        label:'Air Force 1',
                        href:'/'
                    },
                    {
                        label:'Sale',
                        href:'/'
                    },
                    {
                        label:'Football Club',
                        href:'/'
                    }
                ]   
            },
            {
                id:14,
                heading:'Shoes',
                childLinks: [
                    {
                        label:'New Releases',
                        href:'/NewReleases'
                    },
                    {
                        label:'Air Force 1',
                        href:'/'
                    },
                    {
                        label:'Sale',
                        href:'/'
                    },
                    {
                        label:'Football Club',
                        href:'/'
                    }
                ]   
            },
            {
                id:15,
                heading:'Shoes',
                childLinks: [
                    {
                        label:'New Releases',
                        href:'/NewReleases'
                    },
                    {
                        label:'Air Force 1',
                        href:'/'
                    },
                    {
                        label:'Sale',
                        href:'/'
                    },
                    {
                        label:'Football Club',
                        href:'/'
                    }
                ]   
            }
        ]
    },
    {
        id:16,
        label:'Sales',
        href:'/Kids',
        child:[
            {
                id:17,
                heading:'Kids',
                childLinks: [
                    {
                        label:'New Releases',
                        href:'/'
                    },
                    {
                        label:'Air Force 1',
                        href:'/'
                    },
                    {
                        label:'Sale',
                        href:'/'
                    },
                    {
                        label:'Football Club',
                        href:'/'
                    }
                ]   
            },
            {
                id:18,
                heading:'Shoes',
                childLinks: [
                    {
                        label:'New Releases',
                        href:'/NewReleases'
                    },
                    {
                        label:'Air Force 1',
                        href:'/'
                    },
                    {
                        label:'Sale',
                        href:'/'
                    },
                    {
                        label:'Football Club',
                        href:'/'
                    }
                ]   
            },
            {
                id:19,
                heading:'Shoes',
                childLinks: [
                    {
                        label:'New Releases',
                        href:'/NewReleases'
                    },
                    {
                        label:'Air Force 1',
                        href:'/'
                    },
                    {
                        label:'Sale',
                        href:'/'
                    },
                    {
                        label:'Football Club',
                        href:'/'
                    }
                ]   
            },
            {
                id:20,
                heading:'Shoes',
                childLinks: [
                    {
                        label:'New Releases',
                        href:'/NewReleases'
                    },
                    {
                        label:'Air Force 1',
                        href:'/'
                    },
                    {
                        label:'Sale',
                        href:'/'
                    },
                    {
                        label:'Football Club',
                        href:'/'
                    }
                ]   
            }
        ]
    }
]