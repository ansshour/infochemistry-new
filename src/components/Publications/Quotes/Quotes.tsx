import { useContext, useState } from "react";
import { Quote } from "./Quote/Quote"
import styles from "./Quotes.module.css"
import { Modal } from "../../UI/Modal/Modal";


type Props = {
    data: any;
}

export const Quotes: React.FC<Props> = ({ data }) => {



    const concatPlace = (journal: string, year: number, pages: string) => {
        let result = "";
        if (journal) {
            result += journal;
        }
        if (year) {
            result += `, ${year}`;
        }
        if (pages) {
            result += `, ${pages}`;
        }
        return result
    }

    return (
        <>
            <div className={styles.quotes}>
                <span className={styles.year}>{data[0].year}</span>
                {data.map(({ authors, name, journal, if_score, sjr_score, year, pages, gost_citation, mla_citation, asa_citation, plain_text, bibtex, plaintext_citation, plaintext_citation_full, bibtex_citation, bibtex_citation_full }: any, i: number) => <Quote
                    plaintext_citation={plaintext_citation}
                    plaintext_citation_full={plaintext_citation_full}
                    bibtex_citation={bibtex_citation}
                    bibtex_citation_full={bibtex_citation_full}
                    key={i}
                    authors={authors}
                    name={name}
                    place={concatPlace(journal, year, pages)}
                    code={`[IF: ${if_score}, SJR: ${sjr_score}]`}
                    mla_citation={plain_text ? plain_text : mla_citation}
                    asa_citation={bibtex ? bibtex : asa_citation}
                    gost_citation={gost_citation} />)}
            </div>
        </>
    )
}