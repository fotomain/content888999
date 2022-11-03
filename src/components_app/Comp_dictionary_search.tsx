

//=== DOC
// https://stackoverflow.com/questions/62699840/ionic-react-trying-to-implement-a-filtering-search-bar-to-filter-pre-made-lists

import React, { useState, useEffect } from "react";
import {
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonFooter,
    IonModal,
    IonIcon,
    IonSearchbar, IonText,
} from "@ionic/react";
import {log} from "util";

export const DATA = [
    {
        id: "s1",
        title: "Business1111111",
        detail:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        page: "/search-business",
    },
]

export const DATA1 = [
    {
        id: "s1",
        title: "Business",
        detail:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        page: "/search-business",
    },
    {
        id: "s2",
        title: "Computing",
        detail:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        page: "/search-computing",
    },
    {
        id: "s3",
        title: "Connections",
        detail:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        page: "/search-connections",
    },
    {
        id: "s4",
        title: "Construction",
        detail:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        page: "/search-construction",
    },
    {
        id: "s5",
        title: "Engineering",
        detail:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        page: "/search-engineering",
    },
    {
        id: "s6",
        title: "Graduate",
        detail:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        page: "/search-graduate",
    },
    {
        id: "s7",
        title: "Marketing",
        detail:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        page: "/search-marketing",
    },
    {
        id: "s8",
        title: "Medicine",
        detail:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        page: "/search-medicine",
    },
    {
        id: "s9",
        title: "Science",
        detail:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        page: "/search-science",
    },
];

interface ContainerProps {
    name: string;
}

const Search: React.FC<ContainerProps> = ({ name }) => {
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSearch, setFilteredSearch] = useState([
        {
            id: "",
            title: "",
            detail: "",
            page: "",
        }])

    useEffect(() => {

        var listIsEmpty = false;

        if (!listIsEmpty){

            console.log("=== DATA.length " , DATA.length)

            console.log(1111111)

                let tempSearchResult = DATA.filter(ele => {
                        if (ele?.title) {
                            return ele.title.includes(searchQuery)
                        }
                        return false
                    }
                )
                setFilteredSearch([...tempSearchResult])
                console.log(tempSearchResult)

        }

        if(listIsEmpty) {

            console.log(3333333333)

            setFilteredSearch([])

            console.log(DATA)

        }

    },[searchQuery])

    return (
    <>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Search</IonTitle>
            </IonToolbar>
            {(!searchQuery)?
                <IonText>Loading...</IonText>
                :
                <IonText>Ok...</IonText>
            }
            <IonToolbar>
                <IonSearchbar value={searchQuery} onIonChange={ e => {
                    console.log("=== e1")
                    console.log(e)
                    return (!e.detail.value)?'' : setSearchQuery( e.detail.value )
                }
                } >

                </IonSearchbar>
            </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
                    <IonGrid>
                        <IonRow>

                            {filteredSearch.map((search) => (
                                <IonCol
                                    size="12"
                                    size-xs="12"
                                    size-sm="6"
                                    size-md="4"
                                    size-lg="4"
                                    key={search.id}
                                >
                                    <IonCard>
                                        <IonCardHeader>
                                            <IonCardTitle>{search.title}</IonCardTitle>
                                            <IonCardSubtitle>Sector</IonCardSubtitle>
                                        </IonCardHeader>
                                        <IonCardContent>{search.detail}</IonCardContent>
                                        <IonFooter className="ion-text-right">
                                            <IonButton
                                                color="secondary"
                                                fill="clear"
                                                routerLink={search.page}
                                            >
                                                View
                                            </IonButton>
                                        </IonFooter>
                                    </IonCard>
                                </IonCol>
                            ))}
                            <IonCol className="ion-text-center">
                                <IonModal isOpen={showModal} >
                                    {/*cssClass="my-custom-class"*/}

                                    <p>This is modal content</p>
                                    <IonButton
                                        color="secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close Modal
                                    </IonButton>
                                </IonModal>
                                <IonButton color="secondary" onClick={() => setShowModal(true)}>
                                    Information
                                </IonButton>
                            </IonCol>

                        </IonRow>
                    </IonGrid>
                </IonContent>
    </>
    )

}; //React.FC

export default Search;

