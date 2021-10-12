import { Card, CardHeader, Grid } from "@material-ui/core";
import { firestore } from "firebase";
import _ from "lodash";
import log from "loglevel";
import React, { useEffect, useState } from "react";

import * as fs from "../firebase";

export interface State {
  content: Array<Array<Record<string, firestore.DocumentSnapshot>>>;
}

export default function Content() {
  const [content, setContent] = useState([] as Array<
    Array<Record<string, firestore.DocumentSnapshot>>
  >);

  useEffect(() => {
    const unregisterObserver = fs.database.collection("content").onSnapshot(snapshot => {
      const contentBuckets: Array<Array<Record<string, firestore.DocumentSnapshot>>> = [];

      snapshot.docs.forEach(doc => {
        if (!contentBuckets[doc.get("classLevel")]) {
          contentBuckets[doc.get("classLevel")] = [];
        }
        const contentBucket: any[] = contentBuckets[doc.get("classLevel")];
        if (!contentBucket[doc.get("num")]) {
          contentBucket[doc.get("num")] = {};
        }
        const currContent: any = contentBucket[doc.get("num")];
        currContent[doc.get("type")] = doc;
      });
      setContent(contentBuckets);
    });

    return function cleanup() {
      unregisterObserver();
    };
  });

  return (
    <Grid container spacing={1}>
      {content.map((bucket, classLevel) =>
        bucket ? (
          <Grid item xs={4} key={classLevel}>
            <Card>
              <CardHeader>Class Level {classLevel}</CardHeader>
              {bucket.map((coll, num) => {
                log.debug(coll);
                return coll ? (
                  <div key={num}>
                    <h2>Number {num}</h2>
                    <ul>
                      {_.map(coll, (c, i) => (
                        <li key={i}>
                          {c.get("title")} &mdash; {c.get("type")}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  ""
                );
              })}
            </Card>
          </Grid>
        ) : (
          ""
        )
      )}
    </Grid>
  );
}
